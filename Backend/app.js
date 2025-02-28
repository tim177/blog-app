const express = require("express");
const cors = require("cors");
const path = require("path");
const authRouter = require("./routes/auth");
const commentRouter = require("./routes/comment");
const userRouter = require("./routes/user");
const storyRouter = require("./routes/story");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "public")));

//Routes
app.use("/api/auth", authRouter);
app.use("/api/story", storyRouter);
app.use("/api/user", userRouter);
app.use("/api/comment", commentRouter); //✅

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find {req.originalUrl} on this server`);
  err.status = "fail";
  err.statusCode = 404;
});

module.exports = app;
