const express = require('express');

const Customer = require('./../models/customer');

const router = express.Router();


router.get('/api/customers/:page/:length', (req, res) => {
  Customer.find({})
    .sort({_id: -1})
    .skip((parseInt(req.params.page)-1)*(parseInt(req.params.length)))
    .limit(parseInt(req.params.length)+1)
    .select('name prefferedContainer')
    .populate("prefferedContainer", "name")
    .then((results) => {
      const length = results.length;
      if(length === 11)
        results.pop();
      const response = Object.create(null);
      response.results = results;
      response.hasNext = parseInt(length) === (parseInt(req.params.length) + 1);
      res.send(JSON.stringify(response));
    })
    .catch((error) => {
      console.log(error)
    })
});

router.get('/api/customers', (req, res) => {
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

router.post('/api/customer', (req, res) => {
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