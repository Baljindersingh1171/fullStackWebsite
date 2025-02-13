const express = require("express");
let bodyParser = require("body-parser");
const { connectMongoDb } = require("./connection");
const userRouter = require("./routes/user");
const cartRouter = require("./routes/cart");
const profileRouter=require("./routes/profile");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(bodyParser.json());
connectMongoDb("mongodb://127.0.0.1:27017/ecommerce");
app.use("/api/user", userRouter);
app.use("/api/user/cart", cartRouter);
app.use("/api/user/profile",profileRouter)

app.listen("6000", () => console.log("server started"));
