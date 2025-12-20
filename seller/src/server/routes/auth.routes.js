import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Seller from "../models/Seller.js";

const router = express.Router();
const JWT_SECRET = "MY_SECRET_KEY";

const temporaryBlocks = {};

router.post("/signup", async (req, res) => {
  
});

router.post("/login", async (req, res) => {
  
});

export default router;
