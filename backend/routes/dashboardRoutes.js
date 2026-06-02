import express from "express";
import { getStats } from "../controllers/dashboardController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/stats",
  verifyToken,
  authorizeRoles("ADMIN"),
  getStats
);

export default router;