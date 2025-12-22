import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("authHeader:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.sellerId = decoded.sellerId;
    next();
  } catch (err) {
    console.error("JWT error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
}