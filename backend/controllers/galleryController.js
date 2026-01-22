const GalleryModel = require('../models/galleryModel');

const galleryController = {
  // Get all events
  getAllEvents: async (req, res) => {
    try {
      const events = await GalleryModel.findAll();
      
      // Sort by createdAt (newest first)
      events.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      res.json({
        success: true,
        data: events
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching events',
        error: error.message
      });
    }
  },

  // Get single event by ID
  getEventById: async (req, res) => {
    try {
      const event = await GalleryModel.findById(req.params.id);
      if (!event) {
        return res.status(404).json({
          success: false,
          message: 'Event not found'
        });
      }
      res.json({
        success: true,
        data: event
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching event',
        error: error.message
      });
    }
  },

  // Create new event
  createEvent: async (req, res) => {
    try {
      const { title, coverImage, images } = req.body;

      // Validate required fields
      if (!title || !coverImage) {
        return res.status(400).json({
          success: false,
          message: 'Title and cover image are required'
        });
      }

      const eventData = {
        title,
        coverImage,
        images: images || []
      };

      const newEvent = await GalleryModel.create(eventData);

      res.status(201).json({
        success: true,
        message: 'Event created successfully',
        data: newEvent
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating event',
        error: error.message
      });
    }
  },

  // Update event
  updateEvent: async (req, res) => {
    try {
      const event = await GalleryModel.findById(req.params.id);
      if (!event) {
        return res.status(404).json({
          success: false,
          message: 'Event not found'
        });
      }

      const updatedEvent = await GalleryModel.update(req.params.id, req.body);

      res.json({
        success: true,
        message: 'Event updated successfully',
        data: updatedEvent
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating event',
        error: error.message
      });
    }
  },

  // Delete event
  deleteEvent: async (req, res) => {
    try {
      const event = await GalleryModel.findById(req.params.id);
      if (!event) {
        return res.status(404).json({
          success: false,
          message: 'Event not found'
        });
      }

      await GalleryModel.delete(req.params.id);

      res.json({
        success: true,
        message: 'Event deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting event',
        error: error.message
      });
    }
  },

  // Add image to event
  addImageToEvent: async (req, res) => {
    try {
      const event = await GalleryModel.findById(req.params.id);
      if (!event) {
        return res.status(404).json({
          success: false,
          message: 'Event not found'
        });
      }

      const { imageUrl } = req.body;
      if (!imageUrl) {
        return res.status(400).json({
          success: false,
          message: 'Image URL is required'
        });
      }

      const updatedImages = [...(event.images || []), imageUrl];
      const updatedEvent = await GalleryModel.update(req.params.id, {
        images: updatedImages
      });

      res.json({
        success: true,
        message: 'Image added successfully',
        data: updatedEvent
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error adding image',
        error: error.message
      });
    }
  },

  // Remove image from event
  removeImageFromEvent: async (req, res) => {
    try {
      const event = await GalleryModel.findById(req.params.id);
      if (!event) {
        return res.status(404).json({
          success: false,
          message: 'Event not found'
        });
      }

      const { imageUrl } = req.body;
      if (!imageUrl) {
        return res.status(400).json({
          success: false,
          message: 'Image URL is required'
        });
      }

      const updatedImages = (event.images || []).filter(img => img !== imageUrl);
      const updatedEvent = await GalleryModel.update(req.params.id, {
        images: updatedImages
      });

      res.json({
        success: true,
        message: 'Image removed successfully',
        data: updatedEvent
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error removing image',
        error: error.message
      });
    }
  }
};

module.exports = galleryController;
