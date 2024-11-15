import express from "express";
import * as taskController from "../controllers/taskControllers.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post("/tasks", taskController.addTask);
router.get("/tasks", taskController.getTasks);
router.delete("/tasks/:id", taskController.deleteTask);
router.patch("/tasks/:id/toggle", taskController.toggleTask);
router.patch("/tasks/:id/edit", taskController.editTask);
router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;
