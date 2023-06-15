const express = require('express');
const router = express.Router();
const CategoriesService = require('../services/category.service');
const service = new CategoriesService();


router.get('/', (req, res) => {
  const categories = service.find();
  res.json(categories);
});


router.get('/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const body = req.body;
  if (parseInt(categoryId) === 999){
    console.log('In if')
    res.status(404).json({
      message: 'Not found'
    });
  } else {
    res.json({
      message: 'updated category',
      data : body,
      categoryId,
    })
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

router.post('/', (req, res) => {
  const body = req.body;
  const newCategory = service.create(body);
    res.status(201).json(newCategory);
})

router.put('/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const body = req.body;
  const updateCategory = service.update(categoryId, body);
  res.json(updateCategory);
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deleteCategory = service.delete(id);
  res.json(deleteCategory);
});


module.exports = router;
