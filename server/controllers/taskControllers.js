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
    console.log("inside get: ", { tasks });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve tasks", error });
  }
};
