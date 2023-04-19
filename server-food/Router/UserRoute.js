const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");
const authMiddleware = require("../Middleware/AuthMiddleware");

// event http listener
// Khi goi den http://localhost:3000/auth/admin/user thi middleware hoat dong, khi next() thi moi goi toi getListUser
router.get(
   "/user",
   [authMiddleware.isAuthentication],
   userController.getListUser
);

router.post(
   "/user/create",
   [authMiddleware.isAuthentication, authMiddleware.isAdmin],
   userController.postUser
);

router.get(
   "/user/:userId",
   [authMiddleware.isAuthentication],
   userController.getUserId
);

router.put(
   "/user/edit/:userId",
   [authMiddleware.isAuthentication, authMiddleware.isAdmin],
   userController.updateUser
);

router.delete(
   "/user/delete/:userId",
   [authMiddleware.isAuthentication, authMiddleware.isAdmin],
   userController.deleteUser
);

module.exports = router;
