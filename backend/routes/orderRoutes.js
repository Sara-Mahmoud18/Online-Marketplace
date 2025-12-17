const express = require('express');
const router = express.Router();

const {
  getOrderByBuyer,
  createOrder,
} = require("../controllers/order");

router.get('/:Bid', getOrderByBuyer);
router.post('/', createOrder);

module.exports = router;
