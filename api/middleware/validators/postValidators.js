const { body, param } = require("express-validator");

const validateCreatePost = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required")
    .isLength({ max: 255 }).withMessage("Title must be at most 255 characters"),
  body("content")
    .optional()
    .isString().withMessage("Content must be a string"),
  body("published")
    .optional()
    .isBoolean().withMessage("Published must be a boolean"),
];

const validateUpdatePost = [
  param("postId")
    .isInt().withMessage("Post ID must be an integer"),
  body("title")
    .optional()
    .trim()
    .notEmpty().withMessage("Title cannot be empty if provided")
    .isLength({ max: 255 }).withMessage("Title must be at most 255 characters"),
  body("content")
    .optional()
    .isString().withMessage("Content must be a string"),
  body("published")
    .optional()
    .isBoolean().withMessage("Published must be a boolean"),
];

module.exports = { validateCreatePost, validateUpdatePost };