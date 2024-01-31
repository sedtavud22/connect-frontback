const db = require("../models/db");
const catchAsync = require("../utils/catch-async");

exports.getAll = catchAsync(async (req, res, next) => {
  const subjects = await db.subject.findMany({
    select: {
      id: true,
      title: true,
    },
  });
  res.status(200).json({ subjects });
});
