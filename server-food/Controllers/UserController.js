const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../Models/UserModel");

const getListUser = async (req, res) => {
   try {
      const users = await userModel.find(); // find(): tra ve tat ca cac thong tin tim thay
      return res.status(200).send(users);
   } catch (error) {
      console.log(error);
   }
};

const postUser = (req, res) => {
   try {
      // save data to user collection
      const { username, email, password, role } = req.body;
      userModel.create({
         username: username,
         email: email,
         password: bcrypt.hashSync(password, 10),
         role: role,
      });
      return res.status(200).send("create user success");
   } catch (error) {
      console.log(error);
   }
};

const getUserId = async (req, res) => {
   try {
      const userId = req.params.userId;
      const user = await userModel.findById(userId);
      return res.status(200).send(user);
   } catch (error) {
      console.log(error);
   }
};

const updateUser = async (req, res) => {
   try {
      // update user
      const userId = req.params.userId;
      // const { username, email, role } = req.body;
      await userModel.findByIdAndUpdate(userId, req.body);
      return res.status(200).send("update user success");
   } catch (error) {
      console.log(error);
   }
};

const deleteUser = async (req, res) => {
   try {
      // delete user
      const userId = req.params.userId;
      await userModel.findByIdAndRemove(userId);
      return res.status(200).send("delete user success");
   } catch (error) {
      console.log(error);
   }
};

module.exports = {
   getListUser: getListUser,
   postUser: postUser,
   deleteUser: deleteUser,
   updateUser: updateUser,
   getUserId: getUserId,
};
