const express = require("express");
const router = express.Router();
const contactController = require("../Controllers/ContactController");
const authMiddleware = require("../Middleware/AuthMiddleware");

router.get(
   "/contact",
   [authMiddleware.isAuthentication],
   contactController.getListContact
);

router.post(
   "/contact/create",
   [authMiddleware.isAuthentication],
   contactController.postContact
);

module.exports = router;
