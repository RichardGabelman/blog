const prisma = require("../prisma");

async function checkPostExists(req, res, next) {
  const postId = Number(req.params.postId);

  if (isNaN(postId)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
        authorId: true,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    req.post = post;
    next();
  } catch (err) {
    next(err);
  }
}

async function checkPostExistsAndPublished(req, res, next) {
  const postId = Number(req.params.postId);

  if (isNaN(postId)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
        authorId: true,
        published: true,
      },
    });

    if (!post || !post.published) {
      return res.status(404).json({ error: "Post not found" });
    }

    req.post = post;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { checkPostExists, checkPostExistsAndPublished };