exports.getLogin = async (req, res) => {
  res.render("./login", {
    layout: "login",
  });
};

exports.getDashboard = async (req, res) => {
  console.log(req.user);
  res.render("./dashbaord", {
    name: req.user.firsName,
  });
};
