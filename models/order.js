const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = Schema({
  customer: {type: Schema.ObjectId, ref: 'Customer', required: true},
  placedDate: {type: Date, defaule: Date.now},
  type: {type: Schema.Types.ObjectId, ref:'Type'},
  toBeDeliveredDate: {type: Date},
  toBePaidDate: {type: Date},
  orderDetails: [{product: {type: Schema.ObjectId, ref: 'Product'}, container: {type: Schema.ObjectId, ref: 'Container'}, quantity: {type: Number}}]
})


module.exports = mongoose.model('Order', ContainerSchema);
