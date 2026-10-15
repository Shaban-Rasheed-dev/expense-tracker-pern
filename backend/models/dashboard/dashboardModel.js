import { pool } from "../../config/db.js";
// Find a user by id (without password)
export const findUserById = async (id) => {
  const { rows } = await pool.query(
    "SELECT id, first_name, last_name, email, phone_no, created_at FROM users WHERE id = $1",
    [id],
  );
  return rows[0];
};
