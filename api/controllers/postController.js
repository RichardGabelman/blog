const prisma = require("../prisma");

// TODO: Implement conditional filtering based on auth
// Admins should be able to see all posts, not just published
async function getPosts(req, res, next) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        title: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
}

async function getPostById(req, res, next) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.postId),
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        title: true,
        content: true,
        author: {
          select: {
            username: true,
          },
        },
        comments: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            createdAt: true,
            content: true,
            author: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
}

module.exports = { getPosts, getPostById };
