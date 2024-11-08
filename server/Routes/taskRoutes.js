const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskControllers");

router.post("/tasks", taskController.addTask);

router.get("/tasks", taskController.getTasks);
router.delete("/tasks/:id", taskController.deleteTask);
router.patch("/tasks/:id/toggle", taskController.toggleTask);
router.patch("/tasks/:id/edit", taskController.editTask);

module.exports = router;
