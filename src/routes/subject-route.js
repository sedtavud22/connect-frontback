const express = require("express");
const subjectController = require("../controllers/subject-controller");

const router = express.Router();

router.get("/", subjectController.getAll);

module.exports = router;
