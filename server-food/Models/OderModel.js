const mongoose = require("mongoose");

// Schema: mô tả hình dạng của documents
const OderSchema = new mongoose.Schema(
   {
      username: String,
      email: {
         type: String,
         unique: true,
      },
      name: String,
      image: String,
      description: String,
      price: Number,
      quantity: Number,
   },
   { timestamps: true }
);

// compiler
const OderModel = mongoose.model("Oder", OderSchema);

module.exports = OderModel;
