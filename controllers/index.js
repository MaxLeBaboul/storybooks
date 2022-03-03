exports.getLogin = async (req, res) => {
  res.render("./login", {
    layout: "login",
  });
};

exports.getDashboard = async (req, res) => {
  res.render("./dashbaord");
};
