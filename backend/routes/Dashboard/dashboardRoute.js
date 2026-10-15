import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { getDashboardData } from "../../controllers/Dashboard/dashboardController.js";

export const dashboardRouter = express.Router();

// Only logged-in users can open the dashboard
dashboardRouter.get("/", authMiddleware, getDashboardData);
