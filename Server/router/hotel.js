const express = require("express");

const router = express.Router();

const hotelController = require("../controller/hotel");

router.get("/hotel", hotelController.getHotel);

router.get("/hotel/:id", hotelController.getHotelById);

router.all("/rooms", hotelController.getRoom);
module.exports = router;
