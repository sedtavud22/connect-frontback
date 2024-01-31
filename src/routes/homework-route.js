const express = require("express");
const homeworkController = require("../controllers/homework-controller");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/", authenticate, homeworkController.createHomework);
router.get("/", authenticate, homeworkController.getByTeacher);
router.put("/:id", authenticate, homeworkController.updateHomework);
router.delete("/:id", authenticate, homeworkController.deleteHomework);

module.exports = router;
