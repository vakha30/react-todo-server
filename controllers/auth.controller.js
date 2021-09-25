const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

class AuthController {
  // eslint-disable-next-line class-methods-use-this
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Некорректный запрос", errors });
      }

      const { name, email, password } = req.body;

      const isEmailExist = await User.findOne({ email });

      if (isEmailExist) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким email уже существует" });
      }

      const hashPassword = bcrypt.hashSync(password, 8);

      const user = await new User({ name, email, password: hashPassword });

      await user.save();
      return res.json({ message: "Пользователь добавлен" });
    } catch (error) {
      console.log("R E G I S T E R", error);
      return res.send({ message: "Server error" });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "Пользователь не найден" });
      }

      const isValidPass = bcrypt.compareSync(password, user.password);

      if (!isValidPass) {
        return res.status(400).json({ message: "Неверный пароль" });
      }

      const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
        expiresIn: "1h",
      });

      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
      });
    } catch (error) {
      console.log("L O G I N", error);
      return res.send({ message: "Server error" });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async auth(req, res) {
    try {
      const user = await User.findOne({ _id: req.user.id });

      const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
        expiresIn: "1h",
      });

      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
      });
    } catch (error) {
      console.log("A U T H", error);
      return res.send({ message: "Server error" });
    }
  }
}

module.exports = new AuthController();
