import { z } from "zod";

// Reusable rule for first name and last name
const nameField = (label) =>
  z
    .string()
    .trim()
    .min(2, `${label} must be at least 2 characters`)
    .max(50, `${label} must not be greater than 50 characters`);

// Reusable rule for email
const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .email("Invalid email")
  .max(255, "Email must not be greater than 255 characters");

// Password rule used at signup
const passwordField = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password must not be greater than 72 characters");

// Signup validation
export const signUpSchema = z.object({
  firstName: nameField("First name"),
  lastName: nameField("Last name"),
  email: emailField,
  password: passwordField,
  phoneNo: z
    .string()
    .trim()
    .regex(/^\+?\d{10,15}$/, "Invalid phone number please enter 11 digits")
    .optional(),
});

// Login validation
export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Password is required"),
});
