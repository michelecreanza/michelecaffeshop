const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  img: { type: String },
  price: { type: Number },
  qty: { type: Number }
});

const products = mongoose.model("products", productsSchema);

module.exports = products;
