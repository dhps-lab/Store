const express = require('express');
const router = express.Router();
const CategoriesService = require('../services/category.service');
const service = new CategoriesService();


router.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories);
});


router.get('/:categoryId', async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await service.findOne(categoryId);
    res.json(category);
  } catch (err) {
    // res.status(404).json({ error: err.message});  //Este es la forma normal de manejar un error
    next(err);  //This a way with Middleware
  }

})

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

router.post('/', async (req, res) => {
  const body = req.body;
  const newCategory = await service.create(body);
    res.status(201).json(newCategory);
})

router.put('/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const body = req.body;
    const updateCategory = await service.update(categoryId, body);
    res.json(updateCategory);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message});
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteCategory = await service.delete(id);
  res.json(deleteCategory);
});


module.exports = router;
