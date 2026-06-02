import express from "express";
import { addRating, getMyRating } from "../controllers/ratingController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, addRating);
router.get("/my-rating/:store_id", verifyToken, getMyRating);

export default router;
