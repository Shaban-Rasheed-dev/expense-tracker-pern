import { pool } from "../../config/db.js";

// Find a user by email
export const findUserByEmail = async (email) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};

// Insert a new user and return the created row
export const createUser = async ({
  firstName,
  lastName,
  email,
  password,
  phoneNo,
}) => {
  const { rows } = await pool.query(
    `INSERT INTO users (first_name, last_name, email, password, phone_no)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, first_name, last_name, email, phone_no, created_at`,
    [firstName, lastName, email, password, phoneNo],
  );
  return rows[0];
};

// Find a user by id
export const findUserById = async (id) => {
  const { rows } = await pool.query(
    "SELECT id, first_name, last_name, email, phone_no, created_at FROM users WHERE id = $1",
    [id],
  );
  return rows[0];
};
