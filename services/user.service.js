const boom = require('@hapi/boom');

const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');

class UserService {
  constructor(){}

  async create(data){
    console.log(models);
    const newUser = await models.User.create(data);
    console.log(newUser);
    return newUser;
  }

  async find(){
    const users = await models.User.findAll({
      include: ['customer']
    });
    console.log(users);
    return users;
  }

  async findOne(id){
    const user = await models.User.findByPk(id);
    if(!user){
      boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes){
    const user = await this.findOne(id);
    const answ = await user.update(changes);
    return answ;
  }

  async delete(id){
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }


}

module.exports = UserService;
