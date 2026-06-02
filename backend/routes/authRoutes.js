import express from "express";
import {
  registerUser,
  loginUser,
  updatePassword,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { validateRegister } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", loginUser);
router.patch("/update-password", verifyToken, updatePassword);

export default router;
