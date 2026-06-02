import pool from "../config/db.js";

export const ownerDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const result = await pool.query(
      `SELECT
        s.id,
        s.name,
        COALESCE(ROUND(AVG(r.rating)::numeric, 1), 0) AS average_rating,
        COUNT(r.rating) AS total_ratings
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE s.owner_id = $1
      GROUP BY s.id`,
      [ownerId],
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getStoreRatingsUsers = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const result = await pool.query(
      `SELECT
          u.id,
          u.name,
          u.email,
          r.rating,
         TO_CHAR(r.created_at, 'DD-MM-YYYY') AS created_at
       FROM ratings r
       JOIN users u ON r.user_id = u.id
       JOIN stores s ON r.store_id = s.id
       WHERE s.owner_id = $1
       ORDER BY r.created_at DESC`,
      [ownerId],
    );

    res.json({
      totalRatings: result.rows.length,
      ratings: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
