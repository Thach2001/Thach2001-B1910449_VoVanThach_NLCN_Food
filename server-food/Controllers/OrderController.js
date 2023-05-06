const OrderModel = require("../Models/OrderModel");

const getListOrder = async (req, res) => {
   try {
      const carts = await OrderModel.find(); // find(): tra ve tat ca cac thong tin tim thay
      return res.status(200).send(carts);
   } catch (error) {
      console.log(error);
   }
};

const postOrder = (req, res) => {
   try {
      const authState = req.body.data.authState;
      const cartItems = req.body.data.cartItems;
      const totalPrice = req.body.data.totalPrice;
      OrderModel.create({
         username: authState.username,
         email: authState.email,
         cart: cartItems,
         totalPrice: totalPrice,
      });
      return res.status(200).send("Create order success");
   } catch (error) {
      console.log(error);
   }
};

const deleteOrder = async (req, res) => {
   try {
      const orderId = req.params.orderId;
      await OrderModel.findByIdAndRemove(orderId);
      return res.status(200).send("delete order success");
   } catch (error) {
      console.log(error);
   }
};

module.exports = {
   getListOrder: getListOrder,
   postOrder: postOrder,
   deleteOrder: deleteOrder,
};
