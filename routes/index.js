const router = require("express").Router();
const { getLogin, getDashboard } = require("../controllers/index");

const { ensureAuth, ensureGuest } = require("../middleware/auth");
// @desc Login/Landing page
// @route GET/

router.route("/").get(ensureGuest, getLogin);

// @desc Dashboard
// @route GET/

router.route("/dashbaord").get(ensureAuth, getDashboard);

module.exports = router;
