const mongoose = require("mongoose");

// Schema: mô tả hình dạng của documents
const OderSchema = new mongoose.Schema(
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
const OderModel = mongoose.model("Oder", OderSchema);

module.exports = OderModel;
