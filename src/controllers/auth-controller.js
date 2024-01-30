const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/db");
const catchAsync = require("../utils/catch-async");

exports.register = catchAsync(async (req, res, next) => {
  const { sCode, password, confirmPassword, firstname, email } = req.body;

  if (!(sCode && password && confirmPassword && firstname)) {
    const error = new Error("please fill all blank inputs");
    error.statusCode = 400;
    throw error;
  }

  if (password !== confirmPassword) {
    const error = new Error("password does not match");
    error.statusCode = 400;
    throw error;
  }

  const { confirmPassword: cfpw, ...data } = req.body;

  data.password = await bcrypt.hash(data.password, 10);

  const newStudent = await db.student.create({ data });
  delete newStudent.password;

  res
    .status(201)
    .json({ message: "Successfully registered", user: newStudent });
});

exports.login = catchAsync(async (req, res, next) => {
  const { sCode, tCode, password } = req.body;

  if (sCode && tCode) {
    const error = new Error("2 roles?");
    error.statusCode = 400;
    throw error;
  }

  if (sCode && !/^[s]\d{3}$/.test(sCode)) {
    const error = new Error("invalid code format");
    error.statusCode = 400;
    throw error;
  }

  if (tCode && !/^[t]\d{3}$/.test(tCode)) {
    const error = new Error("invalid code format");
    error.statusCode = 400;
    throw error;
  }

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

  const isCorrect = await bcrypt.compare(password, result.password);
  if (!isCorrect) {
    const error = new Error("invalid credentials");
    error.statusCode = 400;
    throw error;
  }

  const payload = tCode
    ? { id: result.id, tCode: result.tCode }
    : { id: result.id, sCode: result.sCode };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7 days",
  });

  res.status(200).json({ token, user: payload });
});

exports.getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({ user: req.user });
});
