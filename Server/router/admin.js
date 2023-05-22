const express = require("express");

const router = express.Router();
const adminController = require("../controller/admin");
router.get("/infor", adminController.getInforBoard);

router.get("/hotel/:_id", adminController.getHotels);

router.all("/deleted-hotel/:hotelId", adminController.deletedHotel);

router.get("/room/:_id", adminController.getRooms);

router.post("/add-new-hotel", adminController.addNewHotel);

router.all("/deleted-room/:roomId", adminController.deletedRoom);

router.post("/add-new-room", adminController.addNewRoom);

router.all("/getAdmin", adminController.loginAdmin);

router.all("/edit-hotel/:id", adminController.updateHotel);

router.post("/edit-room/:id", adminController.updateRoom);

module.exports = router;
