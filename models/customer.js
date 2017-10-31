const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = Schema({
  name: {type: String, required: true, unique: true, dropDups: true},
  email: {type: String},
  phoneNumber: {type: String},
  prefferedContainers: [{type: Schema.ObjectId, ref: 'Container'}],
  prefferedProducts: [{type: Schema.ObjectId, ref: 'Product'}]
})


module.exports = mongoose.model('Customer', CustomerSchema);
