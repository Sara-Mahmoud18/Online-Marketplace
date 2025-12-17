const express = require('express');
const router = express.Router();

const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
} = require("../controllers/order");

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.put('/:id', updateOrder);

module.exports = router;
