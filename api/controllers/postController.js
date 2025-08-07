const prisma = require("../prisma");
const { validationResult } = require("express-validator");

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

async function createPost(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content, published } = req.body;
  const authorId = req.user.id;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content: content ?? null,
        published: published,
        author: {
          connect: { id: authorId },
        },
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

async function updatePost(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const postId = Number(req.params.postId);
  const { title, content, published } = req.body;
  const userId = req.user.id;

  try {
    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        authorId: true,
      },
    });

    if (!existingPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (existingPost.authorId !== userId) {
      return res.status(403).json({ error: "You are not the author of this post" });
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content: content ?? null }),
        ...(published !== undefined && { published }),
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json(updatedPost);
  } catch (err) {
    next(err);
  }
}

module.exports = { getPosts, getPostById, createPost, updatePost };
