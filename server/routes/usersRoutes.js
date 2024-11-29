const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/usersControllers');

// User registration route
router.post('/register', userControllers.register);

// User login route
router.post('/login', userControllers.login);

// Admin api routes
router.get('/all-profiles', userControllers.getAllUsers);
router.delete('/delete-profile', userControllers.deleteProfile);

module.exports = router;
