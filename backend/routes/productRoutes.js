const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  addRating,
} = require("../controllers/product");

router.get("/all/:buyerId", getAllProducts);
router.get("/:productId", getProductById);
router.post("/:productId/rate", addRating);

module.exports = router;
