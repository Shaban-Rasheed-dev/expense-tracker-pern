import {
  findCategory,
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../../models/Categories/categoryModel.js";

// Create a category for the logged-in user
export const addCategory = async (req, res) => {
  try {
    const { name, type } = req.body;
    const userId = req.user.id;

    const existingCategory = await findCategory({
      userId,
      name,
      type,
    });

    if (existingCategory) {
      return res.status(409).json({
        message: "Category already exists",
      });
    }

    const category = await createCategory({
      userId,
      name,
      type,
    });

    return res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("Add category error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get the logged-in user's categories
export const listCategories = async (req, res) => {
  try {
    const categories = await getCategories({
      userId: req.user.id,
      type: req.validatedQuery.type,
    });

    return res.status(200).json({ categories });
  } catch (error) {
    console.error("List categories error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get a single category by ID
export const getCategory = async (req, res) => {
  try {
    const categoryId = Number(req.params.id);
    const userId = req.user.id;

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return res.status(400).json({
        message: "Invalid category ID",
      });
    }

    const category = await getCategoryById({
      userId,
      categoryId,
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json({ category });
  } catch (error) {
    console.error("Get category error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Update an existing category
export const editCategory = async (req, res) => {
  try {
    const categoryId = Number(req.params.id);
    const { name } = req.body;
    const userId = req.user.id;

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return res.status(400).json({
        message: "Invalid category ID",
      });
    }

    const category = await updateCategory({
      userId,
      categoryId,
      name,
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error("Update category error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
