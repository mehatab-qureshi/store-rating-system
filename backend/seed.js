import pool from "./config/db.js";
import bcrypt from "bcrypt";

const seed = async () => {
  try {
    const adminPassword = await bcrypt.hash("admin123", 10);
    const userPassword = await bcrypt.hash("user123", 10);
    const ownerPassword = await bcrypt.hash("owner123", 10);

    // USERS
    await pool.query(`
      INSERT INTO users (name, email, password, address, role)
      VALUES
      (
        'Admin User',
        'admin@gmail.com',
        '${adminPassword}',
        'Hubli Karnataka',
        'ADMIN'
      ),
      (
        'Test User',
        'user@gmail.com',
        '${userPassword}',
        'Hubli Karnataka',
        'USER'
      ),
      (
        'Store Owner',
        'owner@gmail.com',
        '${ownerPassword}',
        'Hubli Karnataka',
        'STORE_OWNER'
      )
      ON CONFLICT (email) DO NOTHING
    `);

    // STORE OWNER ID
    const owner = await pool.query(
      `SELECT id FROM users WHERE email='owner@gmail.com'`
    );

    const ownerId = owner.rows[0].id;

    // STORE
    await pool.query(`
      INSERT INTO stores (name, email, address, owner_id)
      VALUES
      (
        'Reliance Store',
        'store@gmail.com',
        'Hubli Main Road',
        ${ownerId}
      )
      ON CONFLICT DO NOTHING
    `);

    // STORE ID
    const store = await pool.query(
      `SELECT id FROM stores WHERE email='store@gmail.com'`
    );

    const storeId = store.rows[0].id;

    // USER ID
    const user = await pool.query(
      `SELECT id FROM users WHERE email='user@gmail.com'`
    );

    const userId = user.rows[0].id;

    // RATINGS
    await pool.query(`
      INSERT INTO ratings (user_id, store_id, rating)
      VALUES (${userId}, ${storeId}, 5)
      ON CONFLICT (user_id, store_id) DO NOTHING
    `);

    console.log("Seed data inserted successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seed();