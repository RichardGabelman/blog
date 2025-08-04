const express = require("express");
const userRouter = require("./routes/userRouter.js");

require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Blog API - listening on port ${PORT}!`);
});