import "dotenv/config";
import pg from "pg";

// PostgreSQL connection pool
export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Check DB connectivity (throws an error if connection fails)
export const connectDB = async () => {
  await pool.query("SELECT NOW()");
  console.log("PostgreSQL connected");
};
