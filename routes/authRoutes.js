const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register); // Register route
router.post('/login', login); // Login route

module.exports = router;