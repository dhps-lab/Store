const boom = require('@hapi/boom');

const pool = require('../libs/postgres.pool');

class UserService {
  constructor(){}

  async create(data){
    const query = 'INSERT INTO users (username, email, password) VALUES'

    return data;
  }

  async find(){
    const rta = await pool.query('SELECT * FROM users');
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
