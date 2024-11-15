import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import users from "../models/users.js";
const JWT_SECRET = "adjasdaskdaskdaskdjasdjakjdakjd()?31231231";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const oldUser = await users.findOne({ email });

    if (oldUser) {
      return res.status(400).send({ error: "User already exists" });
    }
    const newUser = new users({ email, password: encryptedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: "Failed to register user " });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email });

    if (!user) {
      return res.status(400).send({ error: "User does not exist" });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

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
    return res.status(500).json({ message: "Failed to login User" });
  }
};
