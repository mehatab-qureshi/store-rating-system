import express from "express";
import cors from "cors";

import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { verifyToken } from "./middleware/authMiddleware.js";
import { authorizeRoles } from "./middleware/roleMiddleware.js";
import adminRoutes from "./routes/adminRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";


const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes); 
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/owner", ownerRoutes);

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows);
});

app.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user
  });
});

app.get(
  "/admin",
  verifyToken,
  authorizeRoles("ADMIN"),
  (req, res) => {
    res.json({
      message: "Welcome Admin Panel"
    });
  }
);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
