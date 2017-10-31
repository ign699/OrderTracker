const express = require('express');

const connection = require('../database/db')

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
  connection.query('select orderid, placeddate, tobepaiddate, tobedelivereddate, cost, ordertypeid, customers.name as customername from orders inner join customers on customers.customerid = orders.customerid where customers.customerid = ? and orders.valid = 1', req.params.customerid)
    .then((results) => {
      res.send(JSON.stringify(results))
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(400);
    })
});

router.get('/order/details/:orderid', (req, res) => {
  connection.query('select orderdetailid, orderdetails.quantity, containers.name as containername, products.name as productname from orderdetails inner join orders on orders.orderid = orderdetails.orderid inner join containers on containers.containerid = orderdetails.containerid inner join products on products.productid = orderdetails.productid where orderdetails.orderid = ? and orderdetails.valid = 1 and orders.valid = 1', req.params.orderid)
    .then((results) => {

      res.send(JSON.stringify(results))
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    })
});

router.get('/orders/:page/:length/:sorting', (req, res) => {
  let sorting;
  ['asc', 'desc'].indexOf(req.params.sorting)>-1?sorting = req.params.sorting:res.sendStatus(400);
  connection.query('select orderid, placeddate, tobepaiddate, tobedelivereddate, cost, type, customers.name as customername from orders inner join customers on customers.customerid = orders.customerid where orders.valid = 1 order by orders.orderid ' + sorting + ' limit ?, ? ', [req.params.page * req.params.length, parseInt(req.params.length)])
  
  .then((results) => {
    console.log(results);
    res.send(JSON.stringify(results))
  })
  .catch((error) => {
    res.sendStatus(400);
  })
})

router.post('/orders/add', (req, res) => {
  const body = req.body;
  console.log(req.body)
  connection.query('insert into orders(placeddate, tobepaiddate, tobedelivereddate, cost, ordertypeid, customerid) values(curdate(), ?, ?, ?, (select ordertypeid from ordertypes where name = ?), (select customerid from customers where name = ? and valid = 1))' , [body.tobepaiddate, body.tobedelivereddate, body.cost, body.type, body.customer])
  .then((results) => {
    const orderId = results.insertId;
    res.sendStatus(200)
  })
  .catch((error) => {
    console.log(error.sqlMessage);
    res.redirect('/addOrder')
  })
});

module.exports = router;