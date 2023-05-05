const express = require("express");
const router = express.Router();
const oderController = require("../Controllers/OderController");
// const authMiddleware = require("../Middleware/AuthMiddleware");

router.get(
   "/oder",
   //    [authMiddleware.isAuthentication],
   oderController.getListOder
);

router.post(
   "/oder/create",
   //    [authMiddleware.isAuthentication, authMiddleware.isAdmin],
   oderController.postOder
);

module.exports = router;
