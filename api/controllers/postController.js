const prisma = require("../prisma");

async function getPosts(req, res, next) {
  let query = {
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
  };
  try {
    if (req.user) {
      const adminRole = await prisma.role.findUnique({
        where: {
          name: "admin",
        },
      });

      const userHasAdminRole = await prisma.userRole.findFirst({
        where: {
          userId: req.user.id,
          roleId: adminRole.id,
        },
      });

      if (userHasAdminRole) {
        delete query.where.published;
      }
    }

    const posts = await prisma.post.findMany(query);
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
