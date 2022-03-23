const { login, profile, crearUsuario, logout } = require("../controllers/auth");
const { auth } = require("../middlewares/auth");
const router = require("express").Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/profile", auth, profile);

router.post("/login", login);
router.post("/register", crearUsuario);
router.post("/logout", logout);

// req.session.userId = user.id;
module.exports = router;
