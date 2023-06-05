const express = require("express");
const app = express();
require("dotenv").config();

const Hotel = require("./models/hotel");

const mongoose = require("mongoose");
const userRouter = require("./router/user");
const hotelRouter = require("./router/hotel");
const transactionRouter = require("./router/transaction");
const adminRouter = require("./router/admin");

const cors = require("cors");
const Room = require("./models/room");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(hotelRouter);
app.use(transactionRouter);
app.use("/admin", adminRouter);
console.log(process.env);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.5jq4ht4.mongodb.net/${process.env.MONGODB_DEFAULT_DATABASE}?retryWrites=true&w=majority`
  )

  .then((result) => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
