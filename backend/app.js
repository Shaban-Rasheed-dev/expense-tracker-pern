import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import { authRouter } from "./routes/Users/authRoutes.js";
import cors from "cors";
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));

// Parse incoming JSON request
app.use(express.json());

// All auth routes start with /api/auth
app.use("/api/auth", authRouter);

// Port from .env
const port = process.env.PORT || 5001;

// Start the server only after the DB connection succeed
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    // No DB means no point running the server
    console.error("DB connection failed:", err.message);
    process.exit(1);
  }
};

startServer();
