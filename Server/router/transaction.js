const express = require("express");

const router = express.Router();

const transactionController = require("../controller/transaction");

router.all("/transaction", transactionController.postAddTransaction);
router.get("/transaction/:username", transactionController.getTransaction);

module.exports = router;
