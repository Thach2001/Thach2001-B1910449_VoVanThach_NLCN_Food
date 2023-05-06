const OderModel = require("../Models/OderModel");

const getListOder = async (req, res) => {
   try {
      const carts = await OderModel.find(); // find(): tra ve tat ca cac thong tin tim thay
      return res.status(200).send(carts);
   } catch (error) {
      console.log(error);
   }
};

const postOder = (req, res) => {
   try {
      const authState = req.body.data.authState;
      const cartItems = req.body.data.cartItems;
      const totalPrice = req.body.data.totalPrice;
      OderModel.create({
         username: authState.username,
         email: authState.email,
         cart: cartItems,
         totalPrice: totalPrice,
      });
      return res.status(200).send("Create oder success");
   } catch (error) {
      console.log(error);
   }
};

const deleteOder = async (req, res) => {
   try {
      const oderId = req.params.oderId;
      await OderModel.findByIdAndRemove(oderId);
      return res.status(200).send("delete oder success");
   } catch (error) {
      console.log(error);
   }
};

module.exports = {
   getListOder: getListOder,
   postOder: postOder,
   deleteOder: deleteOder,
};
