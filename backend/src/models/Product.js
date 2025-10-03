const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
//   _id: { type: Number, required: true }, // keep numeric _id as in your data
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  warranty_years: { type: Number, required: true },
  available: { type: Boolean, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Product', productSchema);
