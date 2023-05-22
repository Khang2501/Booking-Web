const express = require("express");

const userController = require("../controller/user");

const router = express.Router();

router.all("/user", userController.loginUser);

router.all("/add-user", userController.addNewUser);

module.exports = router;
