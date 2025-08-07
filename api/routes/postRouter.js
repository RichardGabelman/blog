const express = require("express");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const postValidate = require("../middleware/validators/postValidators");
const commentValidate = require("../middleware/validators/commentValidators");
const {
  auth,
  optionalAuth,
  adminAuth,
  isCommentAuthor,
  isCommentAuthorOrAdmin,
} = require("../middleware/auth");
const {
  checkPostExists,
  checkPostExistsAndPublished,
} = require("../middleware/postExists");
const checkCommentExists = require("../middleware/commentExists");

const router = express.Router();

router.get("/", optionalAuth, postController.getPosts);
router.post(
  "/",
  adminAuth,
  postValidate.validateCreatePost,
  postController.createPost
);

// Consider breaking request down further into GET /:postId and GET /:postId/comments
router.get("/:postId", optionalAuth, postController.getPostById);
router.put(
  "/:postId",
  adminAuth,
  checkPostExists,
  postValidate.validateUpdatePost,
  postController.updatePost
);
router.delete(
  "/:postId",
  adminAuth,
  checkPostExists,
  postController.deletePost
);

router.post(
  "/:postId/comments",
  auth,
  checkPostExistsAndPublished,
  commentValidate,
  commentController.createComment
);

router.put(
  "/:postId/comments/:commentId",
  auth,
  checkPostExistsAndPublished,
  checkCommentExists,
  isCommentAuthor,
  commentValidate,
  commentController.updateComment
);
router.delete(
  "/:postId/comments/:commentId",
  auth,
  checkPostExists,
  checkCommentExists,
  isCommentAuthorOrAdmin,
  (req, res) => {
    return res.status(501).json({ error: "Not implemented" });
  }
);

module.exports = router;
