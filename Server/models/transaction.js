const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  user: { type: String, required: true },
  hotel: { type: mongoose.Types.ObjectId, required: true, ref: "Hotel" },
  room: [{ type: String, required: true }],
  dateStart: { type: String, required: true },
  dateEnd: { type: String, required: true },
  price: { type: Number, required: true },
  payment: { type: String, required: true },
  status: { type: String, required: true },
  roomId: [{ type: mongoose.Types.ObjectId, required: true, ref: "Room" }],
});

module.exports = mongoose.model("Transaction", transactionSchema);
