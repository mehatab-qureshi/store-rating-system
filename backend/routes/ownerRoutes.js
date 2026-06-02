import express from "express";
import {
  ownerDashboard,
  getStoreRatingsUsers
} from "../controllers/ownerController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  verifyToken,
  authorizeRoles("STORE_OWNER"),
  ownerDashboard
);

router.get(
  "/ratings-users",
  verifyToken,
  authorizeRoles("STORE_OWNER"),
  getStoreRatingsUsers
);

export default router;