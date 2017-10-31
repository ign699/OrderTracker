const express = require('express');

const Customer = require('./../models/customer');

const router = express.Router();

router.get('/customers', (req, res) => {
  Customer.find({}).select('name')
  .then((results) => {
    res.send(JSON.stringify(results))
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  })
})

module.exports = router;