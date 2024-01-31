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
      subjectId: +subjectId,
      teacherId: req.user.id,
    },
  });

  res.status(201).json({ homework: newHomework });
});

exports.getByTeacher = catchAsync(async (req, res, next) => {
  const homeworks = await db.homework.findMany({
    where: {
      teacherId: req.user.id,
    },
    include: {
      subject: {
        select: {
          title: true,
        },
      },
    },
  });
  res.status(200).json({ homeworks });
});

exports.updateHomework = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { question, startdate, duedate, isPublished, subjectId } = req.body;
  const homework = await db.homework.update({
    where: {
      id: +id,
    },
    data: {
      ...req.body,
      subjectId: +subjectId,
      teacherId: req.user.id,
    },
  });
  res.status(200).json({ homework });
});

exports.deleteHomework = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await db.homework.delete({
    where: {
      id: +id,
    },
  });
  res.status(204).json();
});
