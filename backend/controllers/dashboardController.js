import pool from "../config/db.js";

// TOTAL COUNTS
export const getStats = async (req, res) => {
  try {
    const users = await pool.query("SELECT COUNT(*) FROM users");
    const stores = await pool.query("SELECT COUNT(*) FROM stores");
    const ratings = await pool.query("SELECT COUNT(*) FROM ratings");

    res.json({
      totalUsers: users.rows[0].count,
      totalStores: stores.rows[0].count,
      totalRatings: ratings.rows[0].count,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};