const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const productModel = require("../Models/ProductModel");

const getListProduct = async (req, res) => {
   try {
      const products = await productModel.find(); // find(): tra ve tat ca cac thong tin tim thay
      return res.status(200).send(products);
   } catch (error) {
      console.log(error);
   }
};

const postProduct = (req, res) => {
   try {
      const { productname, image, category, description, price } = req.body;
      productModel.create({
         productname: productname,
         image: image,
         category: category,
         description: description,
         price: price,
      });
      return res.status(200).send("Create product success");
   } catch (error) {
      console.log(error);
   }
};

const getProductId = async (req, res) => {
   try {
      const productId = req.params.productId;
      const product = await productModel.findById(productId);
      return res.status(200).send(product);
   } catch (error) {
      console.log(error);
   }
};

const updateProduct = async (req, res) => {
   try {
      const productId = req.params.productId;
      await productModel.findByIdAndUpdate(productId, req.body);
      return res.status(200).send("update product success");
   } catch (error) {
      console.log(error);
   }
};

const deleteProduct = async (req, res) => {
   try {
      const productId = req.params.productId;
      await productModel.findByIdAndRemove(productId);
      return res.status(200).send("delete product success");
   } catch (error) {
      console.log(error);
   }
};

module.exports = {
   getListProduct: getListProduct,
   postProduct: postProduct,
   deleteProduct: deleteProduct,
   updateProduct: updateProduct,
   getProductId: getProductId,
};
