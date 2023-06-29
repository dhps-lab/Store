const boom = require('@hapi/boom');

const getConnection = require('../libs/postgres');

class UserService {
  constructor(){}

  async create(data){
    return data;
  }

  async find(){
    const client = await getConnection();
    const rta = await client.query('SELECT * FROM users');
    console.log(rta.rows);
    return rta.rows;
  }

  async findOne(id){

  }

  async update(id, changes){

  }

  async delete(id){

  }


}

module.exports = UserService;
