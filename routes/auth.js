const router = require("express").Router();
const passport = require("passport");
const { getAuth, getLogout } = require("../controllers/auth");

// @desc Auth with Google
// @route GET/ auth/google

router.route("/google").get(getAuth);

// @desc Google auth callback
// @route GET /auth/google/callback

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashbaord");
  }
);

// @desc Logout user
// @route /auth/logout

router.route("/logout").get(getLogout);

module.exports = router;
