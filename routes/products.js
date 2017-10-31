const express = require('express');

const Products = require('./../models/product');


const router = express.Router();

router.get('/products', (req, res) => {
  Products.find({}).select('name')
  .then((results) => {
    res.send(JSON.stringify(results));
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  })
})

module.exports = router;