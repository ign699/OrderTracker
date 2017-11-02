const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = Schema({
  customer: {type: Schema.ObjectId, ref: 'Customer', required: true},
  placedDate: {type: Date, default: Date.now},
  type: {type: Schema.ObjectId, ref:'OrderType'},
  toBeDeliveredDate: {type: Date},
  toBePaidDate: {type: Date},
  cost: {type: Number},
  details: [{product: {type: Schema.ObjectId, ref: 'Product'}, container: {type: Schema.ObjectId, ref: 'Container'}, quantity: {type: Number}}]
});


module.exports = mongoose.model('Order', OrderSchema);
