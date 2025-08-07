const express = require("express");
const validateUser = require("../middleware/validators/userValidators");
const { createUser } = require("../controllers/userController");

const router = express.Router();

router.post("/", validateUser, createUser);

module.exports = router;
