import Task from "../models/tasks.js";
import jwt from "jsonwebtoken";
const JWT_SECRET = "adjasdaskdaskdaskdjasdjakjdakjd()?31231231";

const getUserFromToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

export const addTask = async (req, res) => {
  try {
    const { name, completed } = req.body;

    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    const { id: userId } = getUserFromToken(token);

    const newTask = new Task({ name, completed, userId });
    if (!userId) {
      return res.status(400).json({ message: "User ID is missing or invalid" });
    }
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to add task", error });
  }
};

export const getTasks = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    const { id: userId } = getUserFromToken(token);
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve tasks", error });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully", id });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error });
  }
};

export const toggleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.completed = !task.completed;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle task", error });
  }
};

export const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    const { newName } = req.body;
    task.name = newName;
    await task.save();
    res.status(200).json(task);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to Edit Task" });
  }
};
