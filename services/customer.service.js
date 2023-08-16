const boom = require('@hapi/boom');

const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor(){}

  async create(data){
    const newCustomer = await models.Customer.create(data, {
      include:  ['user']
    });
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