// userController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const userController = {
  login: (req, res) => {
    res.render("login", { title: "Login" });
  },

  register: (req, res) => {
    res.render("register", { title: "Register" });
  },

  createUser: async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.redirect("/login");
  },

  profile: (req, res) => {
    res.render("profile", { title: "Profile", user: req.user });
  },
};

module.exports = userController;
