const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./server/config/db");
const taskRoutes = require("./server/Routes/taskRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

connectDB();
app.use("/api", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
