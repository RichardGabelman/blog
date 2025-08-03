const express = require("express");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Blog API - listening on port ${PORT}!`);
});