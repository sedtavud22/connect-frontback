const catchAsync = require("../utils/catch-async");
const db = require("../models/db");

exports.createHomework = catchAsync(async (req, res, next) => {
  const { question, startdate, duedate, isPublished, subjectId, teacherId } =
    req.body;

  if (req.user.role !== "teacher") {
    const error = new Error("unauthorized");
    error.statusCode = 401;
    return next(error);
  }
  const newHomework = await db.homework.create({
    data: {
      ...req.body,
      teacherId: req.user.id,
      startdate: new Date(startdate),
      duedate: new Date(duedate),
    },
  });

  res.status(200).json({ homework: newHomework });
});
