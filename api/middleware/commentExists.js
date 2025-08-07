const prisma = require("../prisma");

async function checkCommentExists(req, res, next) {
  const commentId = Number(req.params.commentId);

  if (isNaN(commentId)) {
    return res.status(400).json({ error: "Invalid comment ID" });
  }

  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      select: {
        id: true,
        authorId: true,
      },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    req.comment = comment;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = checkCommentExists;