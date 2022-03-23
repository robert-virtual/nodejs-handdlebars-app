const { PrismaClient } = require("@prisma/client");
const { verify } = require("argon2");
const prisma = new PrismaClient();
const { hash } = require("argon2");
const { cookieName } = require("../constantes");

/**
 * @type { import('../types').handler }
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { correo: email } });
  if (!user) {
    return res.render("login", { error: "Bad Credentials" });
  }

  let valid = await verify(user.clave, password);
  if (!valid) {
    return res.render("login", { error: "Bad Credentials" });
  }

  req.session.userId = user.id;
  res.redirect("/profile");
};

/**
 * @type {import('../types').handler}
 */
exports.profile = async (req, res) => {
  const { userId } = req.session;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  res.render("profile", { user });
};

/**
 * @type {import('../types').handler}
 */
exports.crearUsuario = async (req = request, res = response) => {
  let { clave } = req.body;
  clave = await hash(clave);
  const user = await prisma.user.create({
    data: {
      ...req.body,
      clave,
    },
  });

  req.session.userId = user.id;

  res.redirect("/profile");
};

/**
 * @type {import('../types').handler}
 */
exports.logout = async (req, res) => {
  const done = await new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      res.clearCookie(cookieName);
      if (err) {
        reject(err);
        return;
      }
      resolve(true);
    });
  });
  console.log(done);
  res.redirect("/");
};
