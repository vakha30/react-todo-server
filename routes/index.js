const { Router } = require("express");

const router = Router();

router.use("/api/lists/", require("./lists.routes"));
router.use("/api/tasks/", require("./tasks.routes"));
router.use("/api/auth", require("./auth.routes"));

module.exports = router;
