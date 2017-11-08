const express = require('express');

const OrderType = require('./../models/ordertype');

const router = express.Router();

router.get('/api/types', (req, res) => {
  OrderType.find({}).select('name')
  .then((results) => {
    res.send(JSON.stringify(results));
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  })
});

module.exports = router;