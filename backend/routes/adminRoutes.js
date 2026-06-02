import express from "express";
import {
  addUser,
  addStore,
  getAllUsers,
  getAllStoresAdmin,
  getUserById,
} from "../controllers/adminController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ADMIN ONLY
router.post("/add-user", verifyToken, authorizeRoles("ADMIN"), addUser);
router.post("/add-store", verifyToken, authorizeRoles("ADMIN"), addStore);
router.get("/users", verifyToken, authorizeRoles("ADMIN"), getAllUsers);
router.get("/stores", verifyToken, authorizeRoles("ADMIN"), getAllStoresAdmin);
router.get("/users/:id", verifyToken, authorizeRoles("ADMIN"), getUserById);

export default router;
