const jwt = require("jsonwebtoken");
const userModel = require("../Models/UserModel");

// Su dung Express Middleware: verifile token
const isAuthentication = (req, res, next) => {
   try {
      // verifile token
      const bearerHeader = req.headers["authorization"];
      const accessToken = bearerHeader.split(" ")[1];
      const decodeJwt = jwt.verify(accessToken, process.env.SECRET_JWT);

      // set userId to req object
      req.userId = decodeJwt._id;
      next(); // goi function tiep theo
   } catch (error) {
      // gui ma loi client biet refresh token
      // xu lý khi token het thoi gian truy cap
      if (error instanceof jwt.TokenExpiredError) {
         return res.status(401).send("Token expired");
      }
      return res.status(401).send("Authentication is not valid");
   }
};

// check role is admin
const isAdmin = async (req, res, next) => {
   try {
      const userId = req.userId;
      const user = await userModel.findById(userId);
      if (user.role === "admin") {
         next();
      }
   } catch (error) {
      return res.status(401).send("Authentication not valid");
   }
};

module.exports = {
   isAuthentication: isAuthentication,
   isAdmin: isAdmin,
};
