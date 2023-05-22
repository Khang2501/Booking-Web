const express = require("express");
const app = express();

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

mongoose
  .connect(
    "mongodb+srv://khanghvfx17345:IBR9NwJ3lwdaWMhD@cluster0.5jq4ht4.mongodb.net/booking?retryWrites=true&w=majority"
  )

  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
