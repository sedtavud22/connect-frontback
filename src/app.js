require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");
const authRouter = require("./routes/auth-route");
const homeworkRouter = require("./routes/homework-route");
const authenticate = require("./middlewares/authenticate");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/homework", homeworkRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

let port = process.env.PORT;
app.listen(port, () => console.log("server running on port", port));
