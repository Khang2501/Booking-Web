const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  maxPeople: { type: Number, required: true },
  desc: { type: String, required: true },
  roomNumbers: [{ type: Number, required: true }],
});

module.exports = mongoose.model("Room", roomSchema);
