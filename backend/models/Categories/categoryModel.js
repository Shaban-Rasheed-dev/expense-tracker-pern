import { pool } from "../../config/db.js";

// Check whether the category already exists for this user
export const findCategory = async ({ userId, name, type }) => {
  const { rows } = await pool.query(
    `SELECT id
     FROM categories
     WHERE user_id = $1
       AND LOWER(name) = LOWER($2)
       AND type = $3
     LIMIT 1`,
    [userId, name, type],
  );

  return rows[0] ?? null;
};

// Create a new category
export const createCategory = async ({ userId, name, type }) => {
  const { rows } = await pool.query(
    `INSERT INTO categories (user_id, name, type)
     VALUES ($1, $2, $3)
     RETURNING id, name, type, created_at`,
    [userId, name, type],
  );

  return rows[0];
};

// Get this user's categories, optionally filtered by type
export const getCategories = async ({ userId, type }) => {
  const { rows } = await pool.query(
    `SELECT id, name, type, created_at, updated_at
     FROM categories
     WHERE user_id = $1
       AND ($2::text IS NULL OR type = $2)
     ORDER BY type, name`,
    [userId, type ?? null],
  );

  return rows;
};

// Get one category belonging to this user
export const getCategoryById = async ({ userId, categoryId }) => {
  const { rows } = await pool.query(
    `SELECT id, name, type, created_at, updated_at
     FROM categories
     WHERE user_id = $1
       AND id = $2`,
    [userId, categoryId],
  );

  return rows[0] ?? null;
};

// Update an existing category belonging to this user
export const updateCategory = async ({ userId, categoryId, name }) => {
  const { rows } = await pool.query(
    `UPDATE categories
     SET name = $1,
         updated_at = NOW()
     WHERE id = $2
       AND user_id = $3
     RETURNING id, name, type, created_at, updated_at`,
    [name, categoryId, userId],
  );

  return rows[0] ?? null;
};
