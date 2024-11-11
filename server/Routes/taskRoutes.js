const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskControllers");
const userController = require("../controllers/userController");

router.post("/tasks", taskController.addTask);
router.get("/tasks", taskController.getTasks);
router.delete("/tasks/:id", taskController.deleteTask);
router.patch("/tasks/:id/toggle", taskController.toggleTask);
router.patch("/tasks/:id/edit", taskController.editTask);

router.post("/register", userController.register);

module.exports = router;
