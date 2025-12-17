const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  removeItem,
  removeSellerItems,
  deleteCart,
} = require("../controllers/cart");

router.get("/:buyerId", getCart);
router.post("/:buyerId", addToCart);
router.delete("/:buyerId/item/:itemId", removeItem);
router.delete("/:buyerId/seller/:sellerId", removeSellerItems);

module.exports = router;
