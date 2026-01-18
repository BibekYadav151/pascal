const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');

// GET /api/offers - Get all offers
router.get('/', offerController.getAllOffers);

// GET /api/offers/active - Get active offers
router.get('/active', offerController.getActiveOffers);

// GET /api/offers/upcoming - Get upcoming offers
router.get('/upcoming', offerController.getUpcomingOffers);

// GET /api/offers/:id - Get offer by ID
router.get('/:id', offerController.getOfferById);

// POST /api/offers - Create new offer
router.post('/', offerController.createOffer);

// PUT /api/offers/:id - Update offer
router.put('/:id', offerController.updateOffer);

// DELETE /api/offers/:id - Delete offer
router.delete('/:id', offerController.deleteOffer);

module.exports = router;