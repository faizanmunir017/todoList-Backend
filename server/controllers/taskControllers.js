const Task = require("../models/tasks");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "adjasdaskdaskdaskdjasdjakjdakjd()?31231231";

const getUserFromToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

exports.addTask = async (req, res) => {
  try {
    const { name, completed } = req.body;

    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    // console.log("token add tasks:", token);
    const { id: userId } = getUserFromToken(token);

    const newTask = new Task({ name, completed, userId });
    if (!userId) {
      console.log("user Id error");
      return res.status(400).json({ message: "User ID is missing or invalid" });
    }
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to add task", error });
  }
};

exports.getTasks = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      console.log("problem in header");
      return res.status(401).json({ message: "Authorization header missing" });
    }
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    // console.log("token get tasks:", token);
    const { id: userId } = getUserFromToken(token);
    // console.log(token);
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to retrieve tasks", error });
  }
};

exports.deleteTask = async (req, res) => {
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

exports.toggleTask = async (req, res) => {
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

exports.editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    const { newName } = req.body;
    task.name = newName;
    await task.save();
    res.status(200).json(task);

    if (!task) {
      console.log("here");
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to Edit Task" });
  }
};
