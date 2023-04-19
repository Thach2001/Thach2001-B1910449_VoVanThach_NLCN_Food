const mongoose = require("mongoose");

// Schema: mô tả hình dạng của documents
const UserSchema = new mongoose.Schema(
   {
      username: String,
      email: {
         type: String,
         unique: true,
      },
      password: String,
      role: String,
   },
   { timestamps: true }
);

// compiler
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
