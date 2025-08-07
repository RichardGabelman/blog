const express = require("express");
const postController = require("../controllers/postController");
const validateCreatePost = require("../middleware/validators/postValidators");
const {
  auth,
  optionalAuth,
  adminAuth,
  isCommentAuthor,
  isCommentAuthorOrAdmin,
} = require("../middleware/auth");

const router = express.Router();

router.get("/", optionalAuth, postController.getPosts);
router.post("/", adminAuth, validateCreatePost, (req, res) => {
  return res.status(501).json({ error: "Not implemented" });
});

// Consider breaking request down further into GET /:postId and GET /:postId/comments
router.get("/:postId", optionalAuth, postController.getPostById);
router.put("/:postId", adminAuth, (req, res) => {
  return res.status(501).json({ error: "Not implemented" });
});
router.delete("/:postId", adminAuth, (req, res) => {
  return res.status(501).json({ error: "Not implemented" });
});

router.post("/:postId/comments", auth, (req, res) => {
  return res.status(501).json({ error: "Not implemented" });
});

router.put(
  "/:postId/comments/:commentId",
  auth,
  isCommentAuthor,
  (req, res) => {
    return res.status(501).json({ error: "Not implemented" });
  }
);
router.delete(
  "/:postId/comments/:commentId",
  auth,
  isCommentAuthorOrAdmin,
  (req, res) => {
    return res.status(501).json({ error: "Not implemented" });
  }
);

module.exports = router;
