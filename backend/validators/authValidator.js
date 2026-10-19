import { z } from "zod";
import { Buffer } from "node:buffer";
// Reusable rule for first name and last name
const nameField = (label) =>
  z
    .string({ error: `${label} is required` })
    .trim()
    .min(2, `${label} must be at least 2 characters`)
    .max(50, `${label} must not be greater than 50 characters`)
    // Letters (any language), spaces, apostrophes, dots and hyphens only
    .regex(/^[\p{L}\s'.-]+$/u, `${label} contains invalid characters`);

// Reusable rule for email
const emailField = z
  .string({ error: "Email is required" })
  .trim()
  .toLowerCase()
  .email("Please enter a valid email")
  .max(255, "Email must not be greater than 255 characters");

// Password rule used at signup
const passwordField = z
  .string({ error: "Password is required" })
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password must not be greater than 72 characters")
  // bcrypt only uses the first 72 bytes, so the limit is counted in bytes
  .refine((value) => Buffer.byteLength(value, "utf8") <= 72, {
    message: "Password must not be longer than 72 bytes",
  });

// Signup validation
export const signUpSchema = z
  .object({
    firstName: nameField("First name"),
    lastName: nameField("Last name"),
    email: emailField,
    password: passwordField,
    confirmPassword: z
      .string({ error: "Please confirm your password" })
      .min(1, "Please confirm your password"),
    phoneNo: z
      .string({
        error: "Phone number must be a valid string",
      })
      .trim()
      .regex(
        /^\+?\d{11,15}$/,
        "Phone must be 11 to 15 digits, without spaces or dashes",
      )
      .optional(),
  })
  // Runs after all fields are valid: both passwords must be the same
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
// Login validation
export const loginSchema = z.object({
  email: emailField,
  password: z
    .string({ error: "Password is required" })
    .min(1, "Password is required"),
});
