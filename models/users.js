const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const products = require("../models/products.js");

const userSchema = Schema({
  username: String,
  password: String,
  shoppingcart: []
});

const User = mongoose.model("User", userSchema);

module.exports = User;
