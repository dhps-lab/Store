const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const sequelize = require('../libs/sequelize');
const { query } = require('express');

class CategoriesService {

  constructor(){
    this.categories = [];
    this.generate();
  }

  generate(){
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.categories.push({
        id: faker.string.uuid(),
        name: faker.commerce.product(),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      })
    }
  }

  async create (data){
    const newCategory = {
      id: faker.string.uuid(),
      ...data
    };
    this.categories.push(newCategory);

    const queryId = 'SELECT (max(id) + 1) AS id FROM categories';
    const { rows } = await this.pool.query(queryId);


    let { name, image } = data;
    const values = [rows[0].id, name, image];
    const query = 'INSERT INTO categories (id, name, image) VALUES ($1, $2, $3)';
    const result = await pool.query(query, values);
    return result.rows || 'Error';
  }

  async find (){
    const query = 'SELECT * FROM categories';
    const [data] = await sequelize.query(query);
    return data;
  }

  async findOne (id){
    const query = 'SELECT * FROM categories where id = $1'
    const value = id;
    const result = await this.pool.query(query, [value]);
    const rows = result.rows;
    // const category = this.categories.find(item => item.id === id);

    if (!rows.length) {
      throw boom.notFound('Cannot find category');
    }
    if (rows[0].isBlock) {
      throw boom.conflict('Category is blocked');
    }
    return rows[0];
  }

  async update (id, changes) {
    const dataUpdate = [];
    const setQuery = [];
    Object.entries(changes).forEach((entries,index) => {
      setQuery.push(entries[0] + ` =$${index + 1}`);
      dataUpdate.push(entries[1]);
    });

    const queryUpdate = `UPDATE categories SET ${setQuery.join(', ')} where id = ${id}`;
    await this.pool.query(query, dataUpdate);
    return { id, ...changes };
  }

  async delete (id){
    const query = 'SELECT * FROM categories where id = $1'
    const value = id;
    const result = await this.pool.query(query, [value]);
    const rows = result.rows;
    if (!rows.length) {
      throw boom.notFound('Cannot find category');
    }
    const queryDelete = `DELETE FROM categories WHERE id = $1`;
    await this.pool.query(queryDelete,[id]);
    return {id};
  }
}

module.exports = CategoriesService;
