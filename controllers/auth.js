const passport = require("passport");

exports.getAuth = passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/userinfo.profile"],
});

// (exports.getCallback = passport.authenticate("google", {
//   failureRedirect: "/",
// })),
//   (req, res) => res.redirect("/dashbaord");

exports.getLogout = (req, res) => {
  req.logout();
  res.redirect("/");
};
