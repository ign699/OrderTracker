const express = require('express');

const Customer = require('./../models/customer');

const router = express.Router();

router.get('/customers', (req, res) => {
  Customer.find().sort({_id: -1}).select('name prefferedContainer').populate("prefferedContainer", "name")
  .then((results) => {
    console.log(results);
    res.send(JSON.stringify(results))
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  })
});

router.post('/customer', (req, res) => {
  console.log(req.body);
  const customer = new Customer({name: req.body.name, prefferedContainer: [req.body.container]})
  customer.save()
    .then(() => {
      res.sendStatus(200)
    })
    .catch((error) => {
      console.log(error)
    })
});

module.exports = router;