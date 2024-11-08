const User = require("../models/tasks");

exports.addTask = async (req, res) => {
  try {
    const { name, completed } = req.body;
    const newTask = new User({ name, completed });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to add task", error });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await User.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve tasks", error });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await User.findByIdAndDelete(id);
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
    const task = await User.findById(id);
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
    console.log(id);
    const task = await User.findById(id);
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
