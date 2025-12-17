
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
app.use("/api/products", productRoutes);
app.use("/api/cart",cartRoutes);

const buyerRoutes = require("./routes/buyerRoutes");
app.use("/api", buyerRoutes);
const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

const authController = require('./routes/authRoutes');
app.use('/api', authController);

const commentsRoutes  = require('./routes/commentRoutes');
app.use('/api', commentsRoutes );

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log("MongoDB connected");

  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });

})
.catch(err => console.log(err));
