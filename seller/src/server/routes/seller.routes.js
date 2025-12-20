import express from "express";
import Seller from "../models/sellerModel.js";
import Buyer from "../models/buyerModel.js";
import Order from "../models/orderModel.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", auth, async (req, res) => { });
router.put("/profile", auth, async (req, res) => { });
router.get("/orders", auth, async (req, res) => { });
router.put("/orders/:orderId/status", auth, async (req, res) => { });
router.post("/flag-buyer", auth, async (req, res) => { });
router.post("/remove-flag", auth, async (req, res) => { });
router.get("/flags", auth, async (req, res) => { });
router.get("/status", auth, async (req, res) => { });

export default router;
