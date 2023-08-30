const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class CustomerService {
  constructor(){}

  async create(data){
    const hash = await bcrypt.hash(data.user.password,10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    }
    const newCustomer = await models.Customer.create(newData, {
      include:  ['user']
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async find(){
    const customers = await models.Customer.findAll({
      include: ['user']
    });
    return customers;
  }

  async findOne(id){

  }

  async update(data){

  }

  async delete(id){

  }
}

module.exports = CustomerService;
