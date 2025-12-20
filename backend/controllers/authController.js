import Seller from "../models/sellerModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const temporaryBlocks = {};

export const signup = async (req, res) => {
  const { username, password, location, email, phone } = req.body;
  if (await Seller.findOne({ username }))
    return res.status(400).json({ message: "Username exists" });

  const hashed = await bcrypt.hash(password, 10);
  await Seller.create({ username, password: hashed, location, email, phone });
  res.status(201).json({ message: "Signup successful" });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const seller = await Seller.findOne({ username });
  if (!seller) return res.status(400).json({ message: "User not found" });

  const flags = seller.FlagB.length;
  if (flags > 7) return res.status(403).json({ message: "Permanently banned" });

  const valid = await bcrypt.compare(password, seller.password);
  if (!valid) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign(
    { sellerId: seller._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, flags });
};