import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import pool from "./config/db";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

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
