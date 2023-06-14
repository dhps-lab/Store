const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.json([{
    category:'Grocery',
    description: 'This is a category general'
  }, {
    category: 'home',
    description: 'This is a home product'
  }]);
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

router.put('/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const body = req.body;
    res.json({
      message: 'updated category',
      data : body,
      categoryId,
    })
})



module.exports = router;
