import express from "express";
import dotenv from "dotenv";
import pool from "./config/db";
import file from "./routes/file.route";
import cors from "cors";
import path from "path";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
  })
);

dotenv.config();

const PORT = process.env.PORT || 5000;
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/file", file);

//Connect to DB then start the server
const startServer = async () => {
  try {
    await pool.connect(); //Connect to DB
    app.listen(PORT, () => {
      console.log(`Server running on port:${PORT}`);
    });
  } catch (error) {
    console.log("DB connection failed:", error);
  }
};

startServer();
