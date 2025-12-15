const express = require('express');
const router = express.Router();
const buyerController = require('../controllers/buyerflagging');

// Flag a seller
router.post('/buyers/flag-seller', buyerController.flagSeller);
// Get all sellers flagged by a buyer
router.get('/buyers/:buyerId/flagged-sellers', buyerController.getFlaggedSellersByBuyer);

module.exports = router;
