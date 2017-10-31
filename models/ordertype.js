const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderTypeSchema = Schema({
  name: {type: String, required: true, unique: true, dropDups: true}
})


module.exports = mongoose.model('OrderType', OrderTypeSchema);
