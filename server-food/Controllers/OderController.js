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
      const {
         username,
         email,
         productname,
         image,
         description,
         price,
         quantity,
      } = req.body;
      OderModel.create({
         username: username,
         email: email,
         productname: productname,
         image: image,
         description: description,
         price: price,
         quantity: quantity,
      });
      return res.status(200).send("Create oder success");
   } catch (error) {
      console.log(error);
   }
};

module.exports = {
   getListOder: getListOder,
   postOder: postOder,
};
