const users = require("../models/users");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = new users({ email, password });
    console.log(newUser);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Failed to register user " });
  }
};
