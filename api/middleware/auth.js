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

    const isAdmin = user.roles.some(role => role.name === "admin");
    if (!isAdmin) {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    req.user = user;
    next();
  })(req, res, next);
}

async function isCommentAuthor(req, res, next) {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    const comment = await prisma.comment.findUnique({
      where: {
        id: Number(commentId),
      },
      select: {
        authorId: true,
      },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.authorId !== userId) {
      return res.status(403).json({ error: "Forbidden: not the author" });
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { auth, optionalAuth, adminAuth, isCommentAuthor };