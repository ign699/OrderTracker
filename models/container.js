const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContainerSchema = Schema({
  name: {type: String, required: true, unique: true, dropDups: true},
  weight: {type: Number, required: true}
})


module.exports = mongoose.model('Container', ContainerSchema);
