const mongoose = require("mongoose");

// Schema: mô tả hình dạng của documents
const ProductSchema = new mongoose.Schema({
   name: String,
   description: String,
});

// compiler
const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
