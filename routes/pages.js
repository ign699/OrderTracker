const express = require('express');

const Customer = require('./../models/customer');
const OrderType = require('./../models/ordertype');
const Product = require('./../models/product');
const Container = require('./../models/container');
const router = express.Router();

router.get('/addOrder', (req, res) => {
  const data = [Customer, OrderType, Product, Container].map((model) => {
    return model.find({}).select('name');
  });
  
  Promise.all(data)
  .then((results) => {
    res.render('addOrder', {customers: results[0], types: results[1], products: results[2], containers: results[3]});
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  })
})

module.exports = router;