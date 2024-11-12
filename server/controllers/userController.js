const users = require("../models/users");
const bycrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "adjasdaskdaskdaskdjasdjakjdakjd()?31231231";

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const encryptedPassword = await bycrypt.hash(password, 10);
    const oldUser = await users.findOne({ email });

    if (oldUser) {
      console.log("user already exists");
      return res.status(400).send({ error: "User already exists" });
    }
    const newUser = new users({ email, password: encryptedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Failed to register user " });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email });

    if (!user) {
      console.log("user with this email does not exist");
      return res.status(400).send({ error: "User does not exist" });
    }

    if (await bycrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
      console.log("Token in :", token);

      if (res.status(201)) {
        return res.json({
          code: "200",
          status: "ok",
          token,
          user: {
            _id: user._id,
            email: user.email,
            password: user.password,
          },
        });
      } else {
        return res.json({
          error: "error",
        });
      }
    }
    res.status(400).send({ error: "invalid password entered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login User" });
  }
};
