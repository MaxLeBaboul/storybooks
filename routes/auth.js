const router = require("express").Router();
const { getAuth, getCallback, getLogout } = require("../controllers/auth");

// @desc Auth with Google
// @route GET/ auth/google

router.route("/google").get(getAuth);

// @desc Google auth callback
// @route GET /auth/google/callback

router.route("/google/callback").get(getCallback);

// @desc Logout user
// @route /auth/logout

router.route("/logout").get(getLogout);

module.exports = router;
