const mongoose = require("mongoose");

// Schema: mô tả hình dạng của documents
const OrderSchema = new mongoose.Schema(
   {
      username: String,
      email: {
         type: String,
         unique: true,
      },
      cart: Array,
      totalPrice: Number,
   },
   { timestamps: true }
);

// compiler
const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
