const mongoose = require("mongoose");

// Schema: mô tả hình dạng của documents
const ProductSchema = new mongoose.Schema(
   {
      productname: String,
      image: String,
      category: String,
      description: String,
      price: Number,
   },
   { timestamps: true }
);

// compiler
const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
