import express from "express";
import { loginSchema, signUpSchema } from "../../validators/authValidator.js";
import { login, signUp } from "../../controllers/Users/authController.js";
import { validate } from "../../middlewares/Validate.js";

export const authRouter = express.Router();

// Auth api Endpoints
authRouter.post("/signup", validate(signUpSchema), signUp);
authRouter.post("/login", validate(loginSchema), login);
