const express = require('express');
const router = express.Router();
const buyerController = require('../controllers/buyerflagging');

router.post('/buyers/flagged-sellers', buyerController.flagSeller);
router.get('/buyers/:buyerId/flagged-sellers', buyerController.getFlaggedSellersByBuyer);

module.exports = router;
