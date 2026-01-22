const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

// Get all events
router.get('/', galleryController.getAllEvents);

// Get single event by ID
router.get('/:id', galleryController.getEventById);

// Create new event
router.post('/', galleryController.createEvent);

// Update event
router.put('/:id', galleryController.updateEvent);

// Delete event
router.delete('/:id', galleryController.deleteEvent);

// Add image to event
router.post('/:id/images', galleryController.addImageToEvent);

// Remove image from event
router.delete('/:id/images', galleryController.removeImageFromEvent);

module.exports = router;
