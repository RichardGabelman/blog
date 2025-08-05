const prisma = require("../prisma");

// TODO: Implement conditional filtering based on auth
// Admins should be able to see all posts, not just published
async function getPosts(req, res, next) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
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

module.exports = { getPosts };
