const express = require("express");
const app = express();
const cors = require("cors");

const userRoute = require("./Router/UserRoute");
const ProductRoute = require("./Router/ProductRoute");
const authRoute = require("./Router/AuthRoute");
const connectDb = require("./Services/ConnectDbService");

require("dotenv").config();

// middleware apply cors add all request
app.use(cors());
// middleware get info from by req.body
app.use(express.json());

// connect database
connectDb();

// middleware router
// login, register
app.use("/api/auth", authRoute);

// CRUD Users
app.use("/auth/admin", userRoute);

// CRUD Products
app.use("/auth/admin", ProductRoute);

app.listen(process.env.PORT, function () {
   console.log(`Server listen on port ${process.env.PORT}`);
});
