import express from "express";

import {
  categoryQuerySchema,
  createCategorySchema,
  updateCategorySchema,
} from "../../validators/categoryValidator.js";

import {
  addCategory,
  editCategory,
  getCategory,
  listCategories,
} from "../../controllers/categories/categoryController.js";

import { validate } from "../../middlewares/validate.js";

export const categoryRouter = express.Router();

// Create category
categoryRouter.post("/", validate(createCategorySchema), addCategory);

// Read categories
categoryRouter.get("/", validate(categoryQuerySchema, "query"), listCategories);
//getone category
categoryRouter.get("/:id", getCategory);

// Update category
categoryRouter.patch("/:id", validate(updateCategorySchema), editCategory);
