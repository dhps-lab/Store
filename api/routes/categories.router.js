const express = require('express');
const router = express.Router();
const CategoriesService = require('../services/category.service');
const service = new CategoriesService();
const validatorHandler = require('../middlewares/validator.handler');
const { createCategorySchema, deleteCategorySchema, updateCategorySchema, getCategorySchema} = require('./../schemas/category.schema')


router.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories);
});


router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (err) {
      // res.status(404).json({ error: err.message});  //Este es la forma normal de manejar un error
      next(err);  //This a way with Middleware
    }
  }
)

router.get('/:categoryId/products/:productId', (req, res) => {
  const { productId, categoryId } = req.params;

  res.json([{
    productId: productId,
    category: categoryId,
    description: 'This is a category general'
  }, {
    productId: productId,
    category: categoryId,
    description: 'This is a home product'
  }]);
});

router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newCategory = await service.create(body);
      res.status(201).json(newCategory);
  }
)

router.put('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateCategory = await service.update(id, body);
      res.json(updateCategory);
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: error.message});
    }
  }
)

router.delete('/:id',
  validatorHandler(deleteCategorySchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const deleteCategory = await service.delete(id);
    res.json(deleteCategory);
  }
);


module.exports = router;
