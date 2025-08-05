const prisma = require("../prisma");
const bcrypt = require("bcryptjs");

async function main() {
  const roles = ["user", "admin"];

  for (const roleName of roles) {
    await prisma.role.upsert({
      where: {
        name: roleName,
      },
      update: {},
      create: {
        name: roleName,
      },
    });
  };

  const existingAdmin = await prisma.user.findUnique({
    where: {
      username: process.env.ADMIN_USERNAME,
    },
  });

  if (!existingAdmin) {
    const adminRole = await prisma.role.findUnique({
      where: {
        name: "admin",
      },
    });

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const adminUser = await prisma.user.create({
      data: {
        username: process.env.ADMIN_USERNAME,
        password: hashedPassword,
        roles: {
          create: {
            roleId: adminRole.id,
          },
        },
      },
    });
  };

  console.log("Seeding complete");
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
