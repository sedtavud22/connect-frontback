const jwt = require("jsonwebtoken");
const db = require("../models/db");
const catchAsync = require("../utils/catch-async");

module.exports = catchAsync(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    const error = new Error("unauthorized");
    error.statusCode = 401;
    next(error);
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    const error = new Error("unauthorized");
    error.statusCode = 401;
    next(error);
  }

  if (!token) {
    const error = new Error("unauthorized");
    error.statusCode = 401;
    next(error);
  }

  const { id, sCode, tCode } = jwt.verify(token, process.env.JWT_SECRET);

  const result = tCode
    ? await db.teacher.findFirstOrThrow({
        where: {
          tCode,
        },
      })
    : await db.student.findFirstOrThrow({
        where: {
          sCode,
        },
      });

  delete result.password;

  req.user = result;

  next();
});
