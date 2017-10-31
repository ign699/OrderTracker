//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://ign699:root@ds159254.mlab.com:59254/ordertracker';
mongoose.connect(mongoDB);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Container = require('./container')
const Prodcut = require('./product')
const Customer = require('./customer')
const OrderType = require('./ordertype')

const addContainer = (data) => {
  const container = new Container(data);
  container.save()
  .then(() => {
    console.log("Added new container")
  })
  .catch((error) => {
    console.log("Failed Adding container");
  })
}

const addProduct = (data) => {
  const product = new Prodcut(data);
  product.save()
  .then(() => {
    console.log("Added new container")
  })
  .catch((error) => {
    console.log("Failed Adding container");
  })
}

const addCustomer = (data) => {
  const customer = new Customer(data);
  customer.save()
  .then(() => {
    console.log("Added new container")
  })
  .catch((error) => {
    console.log("Failed Adding container");
  })
}

const addOrderType = (data) => {
  const orderType = new OrderType(data);
  orderType.save()
  .then(() => {
    console.log("Added new type")
  })
  .catch((error) => {
    console.log("Failed Adding type");
  })
}

addContainer({name: 'tacka', weight: 400});
addContainer({name: 'kilo', weight: 1000})

addProduct({name: 'Uszka mięso'})
addProduct({name: 'Uszka grzyb'})

addCustomer({name: 'Mądel'});
addCustomer({name: 'Grosik'})

addOrderType({name: 'faktura'})
addOrderType({name: 'paragon'})
