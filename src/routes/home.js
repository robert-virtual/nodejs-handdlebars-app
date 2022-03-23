const { index } = require("../controllers/home");

const router = require("express").Router();

router.get("/", index);

module.exports = router;
