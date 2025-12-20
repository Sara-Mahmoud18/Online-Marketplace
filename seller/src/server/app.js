import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import sellerRoutes from "./routes/seller.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/seller/products", productRoutes);
app.use("/seller", sellerRoutes);

export default app;
