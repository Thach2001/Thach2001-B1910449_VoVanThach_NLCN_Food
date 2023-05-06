const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/OrderController");
const authMiddleware = require("../Middleware/AuthMiddleware");

router.get(
   "/order",
   [authMiddleware.isAuthentication],
   orderController.getListOrder
);

router.post(
   "/order/create",
   [authMiddleware.isAuthentication],
   orderController.postOrder
);

router.delete(
   "/order/delete/:orderId",
   [authMiddleware.isAuthentication, authMiddleware.isAdmin],
   orderController.deleteOrder
);

module.exports = router;
