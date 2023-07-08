const { faker } = require('@faker-js/faker');
const { models } = require('./../libs/sequelize');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.product(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.url()
      })
    }
  }

  find(){
    const rta = models.Product.findAll();
    return rta;
  }

  findOne(id){
    return this.products.find(item => item.id === id);
  }

  create(data){
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  update(id, changes){
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1){
      throw new Error(`Product ${id} not found`);
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index];
  }

  delete(id){
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1){
      throw new Error(`Product ${id} not found`);
    }
    this.products.splice(index,1);
    return {id};
  }
}

module.exports = ProductsService;
