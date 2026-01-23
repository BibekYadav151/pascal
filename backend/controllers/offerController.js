const Offer = require('../models/offerModel');

const offerController = {
  // Get all offers with optional filtering
  getAllOffers: async (req, res) => {
    try {
      const { status, includeExpired } = req.query;

      // Build query
      let query = {};

      // Filter by status if provided
      if (status) {
        query.status = status;
      }

      // For public API (when includeExpired is not true), exclude expired offers
      if (includeExpired !== 'true') {
        query.status = { $ne: 'expired' };
      }

      // Get offers and sort by createdAt (newest first)
      let offers = await Offer.find(query).sort({ createdAt: -1 });

      // Auto-update status based on startDate and validUntil
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const updatePromises = [];

      offers = offers.map(offer => {
        let newStatus = offer.status;

        // Check if offer has expired based on validUntil
        if (offer.validUntil && offer.validUntil !== 'Ongoing') {
          try {
            const validUntilDate = new Date(offer.validUntil);
            validUntilDate.setHours(23, 59, 59, 999);

            if (!isNaN(validUntilDate.getTime()) && validUntilDate < today) {
              newStatus = 'expired';
              if (offer.status !== 'expired') {
                updatePromises.push(
                  Offer.findByIdAndUpdate(offer._id, { status: 'expired' })
                );
              }
              return { ...offer.toObject(), status: 'expired' };
            }
          } catch (error) {
            // Continue with existing status if parsing fails
          }
        }

        // Auto-update status based on startDate if not expired
        if (offer.startDate && newStatus !== 'expired') {
          const start = new Date(offer.startDate);
          start.setHours(0, 0, 0, 0);
          newStatus = start <= today ? 'current' : 'upcoming';
          if (offer.status !== newStatus) {
            updatePromises.push(
              Offer.findByIdAndUpdate(offer._id, { status: newStatus })
            );
          }
          return { ...offer.toObject(), status: newStatus };
        }

        return offer.toObject();
      });

      // Execute all updates in parallel
      if (updatePromises.length > 0) {
        await Promise.all(updatePromises);
      }

      res.json({
        success: true,
        data: offers
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching offers',
        error: error.message
      });
    }
  },

  // Get single offer by ID
  getOfferById: async (req, res) => {
    try {
      const offer = await Offer.findById(req.params.id);
      if (!offer) {
        return res.status(404).json({
          success: false,
          message: 'Offer not found'
        });
      }
      res.json({
        success: true,
        data: offer
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching offer',
        error: error.message
      });
    }
  },

  // Create new offer
  createOffer: async (req, res) => {
    try {
      const { title, description, discount, startDate, validUntil, category, status, bgColor, terms } = req.body;

      // Validate required fields
      if (!title || !description || !discount || !category || !startDate) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
      }

      // Determine status based on startDate if not provided
      let offerStatus = status;
      if (!offerStatus && startDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        offerStatus = start <= today ? 'current' : 'upcoming';
      }

      const offerData = {
        title,
        description,
        discount,
        startDate,
        validUntil: validUntil || 'Ongoing',
        category,
        status: offerStatus || 'current',
        bgColor: bgColor || 'bg-orange-500',
        terms: terms || []
      };

      const newOffer = await Offer.create(offerData);

      res.status(201).json({
        success: true,
        message: 'Offer created successfully',
        data: newOffer
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating offer',
        error: error.message
      });
    }
  },

  // Update offer
  updateOffer: async (req, res) => {
    try {
      // Determine status based on startDate if it's being updated
      let updateData = { ...req.body };
      if (updateData.startDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const start = new Date(updateData.startDate);
        start.setHours(0, 0, 0, 0);
        updateData.status = start <= today ? 'current' : 'upcoming';
      }

      const updatedOffer = await Offer.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedOffer) {
        return res.status(404).json({
          success: false,
          message: 'Offer not found'
        });
      }

      res.json({
        success: true,
        message: 'Offer updated successfully',
        data: updatedOffer
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating offer',
        error: error.message
      });
    }
  },

  // Delete offer
  deleteOffer: async (req, res) => {
    try {
      const offer = await Offer.findByIdAndDelete(req.params.id);

      if (!offer) {
        return res.status(404).json({
          success: false,
          message: 'Offer not found'
        });
      }

      res.json({
        success: true,
        message: 'Offer deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting offer',
        error: error.message
      });
    }
  }
};

module.exports = offerController;
