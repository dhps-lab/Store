const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

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
    return newCategory;
  }

  async find (){
    return this.categories;
  }

  async findOne (id){
    const category = this.categories.find(item => item.id === id);
    if (!category) {
      throw boom.notFound('Cannot find category');
    }
    if (category.isBlock) {
      throw boom.conflict('Category is blocked');
    }
    return category;
  }

  async update (id, changes) {
    const index = this.categories.findIndex(c => c.id === id);
    if (index === -1){
      // throw new Error('Cannot find category');  //Classic way
      throw boom.notFound('Cannot find category');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes,
    }
    return this.categories[index];
  }

  async delete (id){
    const index = this.categories.findIndex(c => c.id === id);
    if (index === -1){
      throw new Error('Cannot find category')
    }
    let deleted = this.categories[index];
    this.categories.splice(index, 1);
    return deleted;
  }
}

module.exports = CategoriesService;
