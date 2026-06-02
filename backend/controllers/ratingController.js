import pool from "../config/db.js";

// add/update rating
export const addRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { store_id, rating } = req.body;

    // check if rating exists
    const existing = await pool.query(
      "SELECT * FROM ratings WHERE user_id = $1 AND store_id = $2",
      [userId, store_id]
    );

    if (existing.rows.length > 0) {
      // update rating
      const updated = await pool.query(
        "UPDATE ratings SET rating = $1 WHERE user_id = $2 AND store_id = $3 RETURNING *",
        [rating, userId, store_id]
      );

      return res.json({
        message: "Rating updated",
        rating: updated.rows[0]
      });
    }

    // insert rating
    const result = await pool.query(
      "INSERT INTO ratings (user_id, store_id, rating) VALUES ($1, $2, $3) RETURNING *",
      [userId, store_id, rating]
    );

    res.status(201).json({
      message: "Rating submitted",
      rating: result.rows[0]
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getMyRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { store_id } = req.params;

    const result = await pool.query(
      `SELECT rating
       FROM ratings
       WHERE user_id = $1 AND store_id = $2`,
      [userId, store_id]
    );

    if (result.rows.length === 0) {
      return res.json({
        store_id: Number(store_id),
        rating: null,
      });
    }

    res.json({
      store_id: Number(store_id),
      rating: result.rows[0].rating,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};