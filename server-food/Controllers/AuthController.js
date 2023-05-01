const userModel = require("../Models/UserModel");
const bcrypt = require("bcrypt"); // Thu vien dung de bam password
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
   try {
      // get infor from client
      const { username, email, password } = req.body;

      // create data to database
      await userModel.create({
         username: username,
         email: email,
         password: bcrypt.hashSync(password, 10),
         role: "Khách hàng",
      });
   } catch (error) {
      console.log("error", error);
   }

   // console.log(req.body); // Thong tin tu client gui den server
   return res.status(200).send("register user");
};

// login
// 1. Khi an vao login -> tao jwt(json web token)
// 2. o tat ca cac page -> jwt
const login = async (req, res) => {
   // Check email exit
   // findOne: tim ra ban ghi trong database
   const user = await userModel.findOne({
      email: req.body.email,
   });
   if (!user) {
      return res.status(400).send("Invalid Email Or Password");
   }

   // Check email password
   // compareSync: so sanh password bi ma hoa
   const isPassvalid = bcrypt.compareSync(req.body.password, user.password);
   if (!isPassvalid) {
      return res.status(400).send("Invalid Email Or Password");
   }

   const jwtToken = jwt.sign(
      {
         _id: user.id,
         username: user.username,
         role: user.role,
      },
      process.env.SECRET_JWT,
      {
         expiresIn: 7200, // 120 phut se out ra
      }
   );

   return res.status(200).send({ accessToken: jwtToken });
};

const getUserLogin = async (req, res) => {
   try {
      const userId = req.userId;
      const user = await userModel.findById(userId);
      res.json({
         _id: user.id,
         username: user.username,
         email: user.email,
         role: user.role,
      });
   } catch (error) {}
};

module.exports = {
   register: register,
   login: login,
   getUserLogin: getUserLogin,
};
