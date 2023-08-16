const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {
  constructor(){

  }

  async create(data){
    console.log(data);
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find(){
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id){
    const order = await models.Order.findByPk(id, {
      include: ['customer']
    });
    return order;
  }

  async update(id, changes) {

  }

  async delete(id) {

  }
}

module.exports = OrderService;