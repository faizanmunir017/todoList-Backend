const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./server/config/db");
const taskRoutes = require("./server/Routes/taskRoutes");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

connectDB();
app.use("/api", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
