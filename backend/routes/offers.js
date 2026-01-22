const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');

// Get all offers with optional filtering
router.get('/', offerController.getAllOffers);

// Get single offer by ID
router.get('/:id', offerController.getOfferById);

// Create new offer
router.post('/', offerController.createOffer);

// Update offer
router.put('/:id', offerController.updateOffer);

// Delete offer
router.delete('/:id', offerController.deleteOffer);

module.exports = router;
