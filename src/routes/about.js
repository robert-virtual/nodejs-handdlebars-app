const { crear, indexAbout } = require("../controllers/about");

const router = require("express").Router();

router.get("/", indexAbout);

router.post("/", crear);

module.exports = router;
