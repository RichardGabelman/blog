const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  return res.status(501).send("Not implemented");
});

module.exports = router;