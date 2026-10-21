import { z } from "zod";

// Reusable rule for the category name
const nameField = z
  .string({ error: "Name is required" })
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must not be greater than 50 characters");

// Validation for creating a category
export const createCategorySchema = z.object({
  name: nameField,
  type: z.enum(["income", "expense"], {
    error: " Type must be income or expense",
  }),
});
// Validation for updating a category (only the name can change)
export const updateCategorySchema = z.object({
  name: nameField,
});

// Validation for the list filter (?type=income)
export const categoryQuerySchema = z.object({
  type: z
    .enum(["income", "expense"], { message: "Type must be income or expense" })
    .optional(),
});
