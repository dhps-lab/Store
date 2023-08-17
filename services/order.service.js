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

  async addItem(data){
    console.log(data);
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find(){
    const orders = await models.Order.findAll({
      include: ['customer']
    });
    return orders;
  }

  async findOne(id){
    const order = await models.Order.findByPk(id, {
      include: [{
        association: 'customer',
        include: ['user']
      },'items']
    });
    return order;
  }

  async update(id, changes) {

  }

  async delete(id) {

  }
}

module.exports = OrderService;
