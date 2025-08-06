const express = require("express");
const postController = require("../controllers/postController");
const { optionalAuth, adminAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", optionalAuth, postController.getPosts);
router.post("/", (req, res) => {
  return res.status(501).json({ error: "Not implemented" });
});

// Consider breaking request down further into GET /:postId and GET /:postId/comments
router.get("/:postId", optionalAuth, postController.getPostById);
router.put("/:postId", (req, res) => {
  return res.status(501).json({ error: "Not implemented" });
});
router.delete("/:postId", (req, res) => {
  return res.status(501).json({ error: "Not implemented" });
});

router.post("/:postId/comments", (req, res) => {
  return res.status(501).json({ error: "Not implemented" });
});

router.put("/:postId/comments/:commentId", (req, res) => {
  return res.status(501).json({ error: "Not implemented" });
});
router.delete("/:postId/comments/:commentId", (req, res) => {
  return res.status(501).json({ error: "Not implemented" });
});

module.exports = router;