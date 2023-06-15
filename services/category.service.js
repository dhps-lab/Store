const { faker } = require('@faker-js/faker');

class CategoriesService {

  constructor(){
    this.categories = [];
    this.generate();
  }

  generate(){
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.product(),
        image: faker.image.url()
      })
    }
  }

  create (){

  }

  find (){
    return this.categories;
  }

  update (){

  }

  delete (){

  }
}

module.exports = CategoriesService;
