const { validationResult } = require("express-validator");
const prisma = require("../prisma");
const bcrypt = require("bcryptjs");

async function createUser(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array( )});
  }

  const { username, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRole = await prisma.role.findUnique({
      where: {
        name: "user",
      },
    });

    if (!userRole) {
      return res.status(500).json({ error: "User role not found" });
    }

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        roles: {
          create: {
            roleId: userRole.id,
          },
        },
      },
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    next(err);
  }
}

module.exports = { createUser };