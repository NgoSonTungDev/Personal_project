const { Users } = require("../models/model");
const bcrypt = require("bcrypt");

const authControllers = {
  register: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUSer = await new Users({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
      const accountUser = await newUSer.save();
      res.status(200).json(accountUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  login: async (req, res) => {
    try {
      const user = await Users.findOne({ username: req.body.username });
      const password = await bcrypt.compare(req.body.password, user.password);
      if (!user) {
        res.status(404).json("User not found !");
      }
      if (!password) {
        res.status(404).json("Wrong password !!!");
      }
      if (user && password) {
        const { password, ...orther } = user._doc;
        res.status(202).json({ ...orther });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  checkPassword: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id);
      const password = await bcrypt.compare(req.body.password, user.password);
      if (!password) {
        res.status(404).json("Wrong password !!!");
      } else {
        res.status(202).json("Correct password");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authControllers;
