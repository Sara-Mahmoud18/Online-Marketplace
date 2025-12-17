const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  // addComment,
  addRating,
} = require("../controllers/product");

router.get("/all/:id", getAllProducts);
router.get("/:_id", getProductById);
router.post("/:_id/rate", addRating);

module.exports = router;
