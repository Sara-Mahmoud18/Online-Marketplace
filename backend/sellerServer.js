import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/sellerAuthRoutes.js";
import productRoutes from "./routes/sellerProductRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import orderRoutes from "./routes/sellerOrderRoutes.js";

dotenv.config(); // ✅ FIRST

const app = express(); // ✅ ONLY place express() is called

app.use(cors());
app.use(express.json({ limit: '5mb' }));       // يسمح بحجم JSON أكبر
app.use(express.urlencoded({ limit: '5mb', extended: true }));


/* Routes */
app.use(authRoutes);
app.use(productRoutes);
app.use(sellerRoutes);
app.use(orderRoutes);

/* Database */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));

/* Server */
const PORT = process.env.SELLER_PORT || 5001;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
