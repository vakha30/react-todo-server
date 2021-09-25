const { Router } = require("express");
const { check } = require("express-validator");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewars/auth.middleware");

const router = Router();

router.post(
  "/register",
  [
    check(
      "name",
      "Длинна имени должна быть больше 2 и меньше 15 символов"
    ).isLength({ min: 2, max: 15 }),
    check("email", "Некорректный email").isEmail(),
    check(
      "password",
      "Длинна пароля должна быть больше 3 и меньше 12 символов"
    ).isLength({ min: 4, max: 12 }),
  ],
  authController.register
);

router.post("/login", authController.login);
router.get("/auth", authMiddleware, authController.auth);

module.exports = router;
