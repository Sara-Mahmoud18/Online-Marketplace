import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/seller/signup", signup);
router.post("/seller/login", login);

export default router;
