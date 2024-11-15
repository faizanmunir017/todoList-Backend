import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./server/config/db.js";
import taskRoutes from "./server/Routes/taskRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());

connectDB();
app.use("/api", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
