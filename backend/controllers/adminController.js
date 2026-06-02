import pool from "../config/db.js";
import bcrypt from "bcrypt";

// ADD USER(admin)
export const addUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const existing = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password, address, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, address, role`,
      [name, email, hashedPassword, address, role || "USER"],
    );

    res.status(201).json({
      message: "User created",
      user: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//store api
export const addStore = async (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;

    const result = await pool.query(
      `INSERT INTO stores (name, email, address, owner_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, address, owner_id],
    );

    res.status(201).json({
      message: "Store created",
      store: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//getallusers
export const getAllUsers = async (req, res) => {
  try {
    const { search, role, sort, page = 1, limit = 5 } = req.query;

    let query = `
      SELECT id, name, email, address, role, created_at
      FROM users
      WHERE 1=1
    `;

    let values = [];
    let index = 1;

    // SEARCH
    if (search) {
      query += ` AND (name ILIKE $${index} OR email ILIKE $${index})`;
      values.push(`%${search}%`);
      index++;
    }

    // FILTER
    if (role) {
      query += ` AND role = $${index}`;
      values.push(role);
      index++;
    }

    // SORT
    query += ` ORDER BY id ${sort === "desc" ? "DESC" : "ASC"}`;

    // PAGINATION
    const offset = (page - 1) * limit;
    query += ` LIMIT $${index} OFFSET $${index + 1}`;
    values.push(limit, offset);

    const result = await pool.query(query, values);

    res.json({
      page: Number(page),
      limit: Number(limit),
      users: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//getallstoresadmin
export const getAllStoresAdmin = async (req, res) => {
  try {
    const { search } = req.query;

    let query = `
      SELECT
        s.id,
        s.name,
        s.email,
        s.address,
        COALESCE(ROUND(AVG(r.rating), 1), 0) AS average_rating
      FROM stores s
      LEFT JOIN ratings r
      ON s.id = r.store_id
      WHERE 1=1
    `;

    let values = [];
    let index = 1;

    if (search) {
      query += `
        AND (
          s.name ILIKE $${index}
          OR s.email ILIKE $${index}
          OR s.address ILIKE $${index}
        )
      `;

      values.push(`%${search}%`);
      index++;
    }

    query += `
      GROUP BY s.id
      ORDER BY s.id ASC
    `;

    const result = await pool.query(query, values);

    res.json({
      stores: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

//getuser by there id
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const userResult = await pool.query(
      `SELECT id, name, email, address, role
       FROM users
       WHERE id = $1`,
      [id],
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = userResult.rows[0];

    // If Store Owner, get store rating
    if (user.role === "STORE_OWNER") {
      const ratingResult = await pool.query(
        `SELECT
            COALESCE(ROUND(AVG(r.rating), 1), 0) AS average_rating
         FROM stores s
         LEFT JOIN ratings r ON s.id = r.store_id
         WHERE s.owner_id = $1`,
        [id],
      );

      user.average_rating = ratingResult.rows[0].average_rating;
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
