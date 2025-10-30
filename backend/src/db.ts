import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: "localhost", 
  user: "myuser",
  password: "mypassword",
  database: "mydatabase",
  port: 5432,
});

export async function initTables() {
  try {
    // ✅ users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // ✅ company_detail table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS company_detail (
        created_by_user_id INTEGER NOT NULL
          REFERENCES users(id) ON DELETE CASCADE,
        company_type TEXT,
        company_name TEXT,
        house_number TEXT,
        village_number TEXT,
        village_name TEXT,
        alley TEXT,
        road TEXT,
        sub_district TEXT,
        district TEXT,
        province TEXT,
        post_code TEXT,
        contact_prefix TEXT,
        contact_firstname TEXT,
        contact_lastname TEXT,
        contact_phone TEXT,
        contact_email TEXT,
        ref_code TEXT
      );
    `);

    console.log("Tables 'users' and 'company_detail' initialized successfully!");
  } catch (err) {
    console.error("Error initializing tables:", err);
  }
}

export default pool;

