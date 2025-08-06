const prisma = require("../prisma");

async function getPosts(req, res, next) {
  let where = { published: true };

  try {
    if (req.user) {
      const userHasAdminRole = req.user.roles.some(
        (role) => role.name === "admin"
      );

      if (userHasAdminRole) {
        where = {};
      }
    }

    const posts = await prisma.post.findMany({
      where,
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
  let where = { id: Number(req.params.postId), published: true };

  try {
    if (req.user) {
      const userHasAdminRole = req.user.roles.some(
        (role) => role.name === "admin"
      );

      if (userHasAdminRole) {
        where = { id: Number(req.params.postId) };
      }
    }

    const post = await prisma.post.findFirst({
      where,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        title: true,
        content: true,
        published: true,
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
