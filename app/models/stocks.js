var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Stock = new Schema({
  symbol: String
});

module.exports = mongoose.model('Stock', Stock);