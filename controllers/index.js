const Story = require("../models/Story");

exports.getLogin = async (req, res) => {
  res.render("login", {
    layout: "login",
  });
};

exports.getDashboard = async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    console.log(req.user);

    res.render("dashbaord", {
      name: req.user.firstName,
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
};
