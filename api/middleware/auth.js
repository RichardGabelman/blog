const passport = require("passport");
const prisma = require("../prisma");

function auth(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    req.user = user;
    next();
  })(req, res, next);
}

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

    const isAdmin = user.roles.some((role) => role.name === "admin");
    if (!isAdmin) {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    req.user = user;
    next();
  })(req, res, next);
}

async function isCommentAuthor(req, res, next) {
  if (req.comment.authorId !== req.user.id) {
    return res.status(403).json({ error: "Forbidden: not the author" });
  }
  next();
}

async function isCommentAuthorOrAdmin(req, res, next) {
  const isAdmin = req.user.roles.some((role) => role.name === "admin");

  if (req.comment.authorId !== req.user.id && !isAdmin) {
    return res.status(403).json({ error: "Forbidden: not authorized" });
  }
  next();
}

module.exports = {
  auth,
  optionalAuth,
  adminAuth,
  isCommentAuthor,
  isCommentAuthorOrAdmin,
};
