const { body } = require("express-validator");

const validateComment = [
  body("content").trim().notEmpty().withMessage("Content is required"),
];

module.exports = validateComment;