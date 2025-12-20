import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  getProfile,
  updateProfile,
  getStatus,
  getFlaggedBuyers,
  flagBuyer,
  removeFlag
} from "../controllers/sellerController.js";

const router = express.Router();

router.get("/seller/profile", auth, getProfile);
router.put("/seller/profile", auth, updateProfile);
router.get("/seller/status", auth, getStatus);
router.get("/seller/flags", auth, getFlaggedBuyers);
router.post("/seller/flag-buyer", auth, flagBuyer);
router.post("/seller/remove-flag", auth, removeFlag);

export default router;
