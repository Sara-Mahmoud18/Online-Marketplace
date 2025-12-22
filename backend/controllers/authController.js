// controllers/authController.js
import dotenv from "dotenv";
dotenv.config(); // Load .env at the very top

import Seller from "../models/sellerModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Optional: temporary in-memory blocks (you can implement rate limiting or banning here)
const temporaryBlocks = {};

export const signup = async (req, res) => {
  try {
    const { username, password, location, email, phone } = req.body;

    // Check if username already exists
    const existingSeller = await Seller.findOne({ username });
    if (existingSeller) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new seller
    const newSeller = await Seller.create({
      username,
      password: hashedPassword,
      location,
      email,
      phone,
    });

    return res.status(201).json({ message: "Signup successful", sellerId: newSeller._id });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Server error during signup" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const seller = await Seller.findOne({ username });
    if (!seller) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check flag count
    const flags = seller.FlagB?.length || 0;
    if (flags > 7) {
      return res.status(403).json({ message: "Permanently banned" });
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, seller.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Ensure JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not defined in environment variables");
    }

    // Sign JWT
    const token = jwt.sign(
      { sellerId: seller._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ token, flags });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
};