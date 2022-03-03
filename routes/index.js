const router = require("express").Router();
const { getLogin, getDashboard } = require("../controllers/index");

// @desc Login/Landing page
// @route GET/

router.route("/").get(getLogin);

// @desc Dashboard
// @route GET/

router.route("/dashbaord").get(getDashboard);

module.exports = router;
