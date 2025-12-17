const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Auth routes
router.post('/buyers/register', authController.register);
router.post('/buyers/login', authController.login);
module.exports = router;
