const express = require("express");
const userRouter = require("./routes/userRouter.js");
const postRouter = require("./routes/postRouter.js");
const authRouter = require("./routes/authRouter.js");
const passport = require("passport");

require("dotenv").config();
require("./config/passport.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Blog API - listening on port ${PORT}!`);
});
