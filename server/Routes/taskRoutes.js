const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskControllers");

router.post("/tasks", taskController.addTask);

router.get("/tasks", taskController.getTasks);

router.delete("/tasks/:id", taskController.deleteTask);

module.exports = router;
