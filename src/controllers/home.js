const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
/**
 * @type { import('../types').handler }
 */
exports.index = async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      nombre: true,
      correo: true,
    },
  });
  res.render("home", {
    users,
  });
};
