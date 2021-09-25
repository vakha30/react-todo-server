const { Router } = require("express");
const authMiddleware = require("../middlewars/auth.middleware");
const { tasksController } = require("../controllers/tasks.controller");

const router = Router();

router.get("/", authMiddleware, tasksController.getAll);

router.get("/:listId", tasksController.getTasksByListId);

router.post("/add", authMiddleware, tasksController.createTasks);

router.put("/:id", tasksController.updateCompletedTask);

router.put("/edit/:id", tasksController.updateTask);

router.delete("/remove/:listId", tasksController.deleteAllTasks);

router.delete("/delete/:id", tasksController.deleteOneTask);

module.exports = router;
