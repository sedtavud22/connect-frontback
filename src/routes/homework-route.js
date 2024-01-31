const express = require("express");
const homeworkController = require("../controllers/homework-controller");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/", authenticate, homeworkController.createHomework);

module.exports = router;
