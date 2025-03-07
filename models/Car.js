const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Car', CarSchema);
