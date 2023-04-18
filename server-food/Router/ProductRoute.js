const express = require("express");
const router = express.Router();
const ProductController = require("../Controllers/ProductController");
const authMiddleware = require("../Middleware/AuthMiddleware");

router.get(
   "/product",
   [authMiddleware.isAuthentication],
   ProductController.getListProduct
);

router.post(
   "/product/create",
   [authMiddleware.isAuthentication, authMiddleware.isAdmin],
   ProductController.postProduct
);

router.get(
   "/product/:productId",
   [authMiddleware.isAuthentication],
   ProductController.getProductId
);

router.put(
   "/product/edit/:productId",
   [authMiddleware.isAuthentication, authMiddleware.isAdmin],
   ProductController.updateProduct
);

router.delete(
   "/product/delete/:productId",
   [authMiddleware.isAuthentication, authMiddleware.isAdmin],
   ProductController.deleteProduct
);

module.exports = router;
