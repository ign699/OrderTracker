const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
  name: {type: String, required: true, unique: true, dropDups: true},
  ingredients: [{ingredient: {type: Schema.ObjectId, ref: 'Resource', required: true}, amount: {type: Number}}]
})


module.exports = mongoose.model('Product', ProductSchema);
