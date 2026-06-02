import pool from "../config/db.js";

export const getStoreRatings = async (req, res) => {
  try {
    const { store_id } = req.params;

    const result = await pool.query(
      `SELECT 
        s.id,
        s.name,
        s.address,
        COALESCE(AVG(r.rating), 0) AS average_rating,
        COUNT(r.rating) AS total_ratings
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE s.id = $1
      GROUP BY s.id`,
      [store_id],
    );

    const data = result.rows[0];

    if (!data) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    res.json({
      id: data.id,
      name: data.name,
      address: data.address,
      average_rating: Number(data.average_rating).toFixed(1),
      total_ratings: Number(data.total_ratings),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const getAllStores = async (req, res) => {
  try {
    const { search = "", sort = "asc" } = req.query;

    const result = await pool.query(
      `
      SELECT
        s.id,
        s.name,
        s.address,
        COALESCE(ROUND(AVG(r.rating)::numeric, 1), 0) AS average_rating,
        COUNT(r.rating) AS total_ratings
      FROM stores s
      LEFT JOIN ratings r
      ON s.id = r.store_id
      WHERE
        s.name ILIKE $1
        OR s.address ILIKE $1
      GROUP BY s.id
      ORDER BY average_rating ${sort === "desc" ? "DESC" : "ASC"}
      `,
      [`%${search}%`],
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
