const express = require("express");
const { body } = require("express-validator");
const { createUser } = require("../controllers/userController");

const router = express.Router();

const validateUser = [
  body("username")
    .trim()
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

router.post("/", validateUser, createUser);

module.exports = router;
