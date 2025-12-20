import mongoose from "mongoose";
import app from "./app.js";

mongoose.connect("mongodb://localhost:27017/onlineMarket")
  .then(() => console.log("Mongo Connected"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));