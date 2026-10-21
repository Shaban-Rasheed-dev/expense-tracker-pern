import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import { authRouter } from "./routes/Users/authRoutes.js";
import cors from "cors";
import { dashboardRouter } from "./routes/Dashboard/dashboardRoute.js";
import { categoryRouter } from "./routes/Categories/categoryRoute.js";
import { authTokenMiddleware } from "./middlewares/authTokenMiddleware.js";
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));

// Parse incoming JSON request
app.use(express.json());

// All auth routes start with /api/auth
app.use("/api/auth", authRouter);

// All dashboard routes start with /api/dashboard
app.use("/api/dashboard", authTokenMiddleware, dashboardRouter);

// All categories routes start with /api/category
app.use("/api/categories", authTokenMiddleware, categoryRouter);

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
