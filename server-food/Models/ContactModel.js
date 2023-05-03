const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
   {
      fullname: String,
      email: {
         type: String,
         unique: true,
      },
      feedback: String,
   },
   { timestamps: true }
);

const ContactModel = mongoose.model("Contact", ContactSchema);

module.exports = ContactModel;
