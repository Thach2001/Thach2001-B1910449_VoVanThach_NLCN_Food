const express = require("express");
const app = express();
const cors = require("cors");

const authRoute = require("./Router/AuthRoute");
const userRoute = require("./Router/UserRoute");
const productRoute = require("./Router/ProductRoute");
const orderRoute = require("./Router/OrderRoute");
const contactRoute = require("./Router/ContactRoute");
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
app.use("/auth/admin", productRoute);

// Contact
app.use("/auth/admin", orderRoute);

// Contact
app.use("/auth/admin", contactRoute);

app.listen(process.env.PORT, function () {
   console.log(`Server listen on port ${process.env.PORT}`);
});
