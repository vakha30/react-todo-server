const { Router } = require("express");
const authMiddleware = require("../middlewars/auth.middleware");
const { listsController } = require("../controllers/lists.controller");

const router = Router();

router.get("/", authMiddleware, listsController.getAll);

router.post("/add", authMiddleware, listsController.createList);

router.delete("/delete/:id", listsController.deleteList);

module.exports = router;
