const express = require('express');
const router = express.Router();

const {
  getOrderByBuyer,
  createOrder,
} = require("../controllers/order");

router.get('/:buyerId', getOrderByBuyer);
router.post('/', createOrder);

module.exports = router;
