const jwt = require("jsonwebtoken");
const config = require("config");

const authMiddleware = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(500).json({ message: "Auth error" });
    }

    const decoded = await jwt.verify(token, config.get("secretKey"));

    req.user = decoded;

    return next();
  } catch (error) {
    console.log(error);
    return res.send({ message: "Auth error" });
  }
};

module.exports = authMiddleware;
