import express from "express";
import {
  getStoreRatings,
  getAllStores,
} from "../controllers/storeController.js";

const router = express.Router();

router.get("/", getAllStores);
router.get("/:store_id", getStoreRatings);

export default router;
