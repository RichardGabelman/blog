const express = require("express");
const postController = require("../controllers/postController");
const passport = require("passport");

const router = express.Router();

function optionalAuth(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) return next(err);
    if (user) req.user = user; // attach user only if valid token
    next(); // continue regardless
  })(req, res, next);
}

function adminAuth(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isAdmin = user.roles.some(role => role.name === "admin");
    if (!isAdmin) {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    req.user = user;
    next();
  })(req, res, next);
}

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