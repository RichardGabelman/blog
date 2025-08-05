const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.get("/", postController.getPosts);
router.post("/", (req, res) => {
  return res.status(501).json({ error: "Not implemented" });
});

router.get("/:postId", (req, res) => {
  return res.status(501).json({ error: "Not implemented" });
});
router.post("/:postId", (req, res) => {
  return res.status(501).json({ error: "Not implemented" });
});
router.put("/:postId", (req, res) => {
  return res.status(501).json({ error: "Not implemented" });
});
router.delete("/:postId", (req, res) => {
  return res.status(501).json({ error: "Not implemented" });
});

router.get("/:postId/comments", (req, res) => {
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