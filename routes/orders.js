const express = require('express');

const Order = require('./../models/order');

const router = express.Router();

router.get('/order/:orderid', (req, res) => {
  connection.query('select orderid, placeddate, tobepaiddate, tobedelivereddate, cost, ordertypeid, customers.name as customername from orders inner join customers on customers.customerid = orders.customerid where orderid = ? and orders.valid = 1', req.params.orderid)
    .then((results) => {
      res.send(JSON.stringify(results[0]));
    })
    .catch((error) => {
      res.sendStatus(400);
    })
});


router.get('/orders/:customerid', (req, res) => {

});

router.get('/order/details/:orderid', (req, res) => {

});

router.get('/orders/:page/:length', (req, res) => {
  console.log(req.params);
  Order.find().skip((parseInt(req.params.page)-1)*(parseInt(req.params.length))).limit(parseInt(req.params.length)+1).select("toBePaidDate cost toBeDeliveredDate customer type").populate("type customer", "name")
    .then((results) => {
      const length = results.length;
      if(length === 11)
        results.pop();
      const response = Object.create(null);
      response.results = results;
      response.hasNext = parseInt(length) === (parseInt(req.params.length) + 1);
      res.send(JSON.stringify(response))


    })
    .catch((error) => {
      console.log(error)
    })
})

router.post('/orders/add', (req, res) => {
  const body = req.body;
  const order = new Order(body);
  const data = {
    toBePaidDate: body.toBePaidDate,
    toBeDeliveredDate: body.toBeDeliveredDate,
  };
  order.save()
  .then(() => {
    res.sendStatus(200);
  })
  .catch(() => {
  })


});

module.exports = router;