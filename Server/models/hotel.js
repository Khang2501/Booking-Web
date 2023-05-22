const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  distance: { type: String, required: true },
  photos: [{ type: String, required: true }],
  desc: { type: String, required: true },
  rating: { type: Number, required: true },
  featured: { type: Boolean, required: true },
  rooms: [{ type: mongoose.Types.ObjectId, required: true, ref: "Room" }],
  cheapestPrice: { type: Number, required: true },
});

module.exports = mongoose.model("Hotel", hotelSchema);
