const express = require('express');
const router = express.Router();
const contactControllers = require('../controllers/contactControllers');
const authMiddleware = require('../middlewares/authMiddlewares');

// Fetch conatcts
router.get('/', authMiddleware, contactControllers.getContact);

// Create new contact
router.post('/', authMiddleware, contactControllers.createContact);

// Update contact
router.put('/:id', authMiddleware, contactControllers.updateContact);

// Delete contact
router.delete('/:id', authMiddleware, contactControllers.deleteContact);

module.exports = router;
