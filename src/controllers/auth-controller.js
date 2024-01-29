const bcrypt = require("bcryptjs");
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
    .json({ message: "Successfully registered", data: newStudent });
});

exports.login = catchAsync(async (req, res, next) => {});
