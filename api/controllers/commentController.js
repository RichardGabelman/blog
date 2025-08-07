const prisma = require("../prisma");
const { validationResult } = require("express-validator");

async function createComment(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { content } = req.body;

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        postId: req.post.id,
        authorId: req.user.id,
      },
    });

    return res.status(201).json(comment);
  } catch(err) {
    next(err);
  }
}

module.exports = { createComment };