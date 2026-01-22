const OfferModel = require('../models/offerModel');

const offerController = {
  // Get all offers with optional filtering
  getAllOffers: async (req, res) => {
    try {
      const { status, includeExpired } = req.query;
      let offers = await OfferModel.findAll();

      // Auto-update status based on startDate and validUntil
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      offers = offers.map(offer => {
        let newStatus = offer.status;
        
        // Check if offer has expired based on validUntil
        if (offer.validUntil && offer.validUntil !== 'Ongoing') {
          try {
            // Try to parse as date string (YYYY-MM-DD format)
            const validUntilDate = new Date(offer.validUntil);
            validUntilDate.setHours(23, 59, 59, 999); // End of day
            
            // Check if it's a valid date
            if (!isNaN(validUntilDate.getTime()) && validUntilDate < today) {
              newStatus = 'expired';
              // Update in database if status changed
              if (offer.status !== 'expired') {
                OfferModel.update(offer.id, { status: 'expired' });
              }
              return { ...offer, status: 'expired' };
            }
          } catch (error) {
            // If date parsing fails, try to parse as text date
            try {
              // Try parsing common date formats
              const parsedDate = new Date(offer.validUntil);
              if (!isNaN(parsedDate.getTime())) {
                parsedDate.setHours(23, 59, 59, 999);
                if (parsedDate < today) {
                  newStatus = 'expired';
                  if (offer.status !== 'expired') {
                    OfferModel.update(offer.id, { status: 'expired' });
                  }
                  return { ...offer, status: 'expired' };
                }
              }
            } catch (e) {
              // If all parsing fails, continue with existing status
            }
          }
        }
        
        // Auto-update status based on startDate if not expired
        if (offer.startDate && newStatus !== 'expired') {
          const start = new Date(offer.startDate);
          start.setHours(0, 0, 0, 0);
          newStatus = start <= today ? 'current' : 'upcoming';
          // Update in database if status changed
          if (offer.status !== newStatus) {
            OfferModel.update(offer.id, { status: newStatus });
          }
          return { ...offer, status: newStatus };
        }
        return offer;
      });

      // Filter by status if provided
      if (status) {
        offers = offers.filter(offer => offer.status === status);
      }

      // For public API (when includeExpired is not true), exclude expired offers
      if (includeExpired !== 'true') {
        offers = offers.filter(offer => offer.status !== 'expired');
      }

      // Sort by createdAt (newest first)
      offers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
      const offer = await OfferModel.findById(req.params.id);
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

      const newOffer = await OfferModel.create(offerData);

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
      const offer = await OfferModel.findById(req.params.id);
      if (!offer) {
        return res.status(404).json({
          success: false,
          message: 'Offer not found'
        });
      }

      // Determine status based on startDate if it's being updated
      let updateData = { ...req.body };
      if (updateData.startDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const start = new Date(updateData.startDate);
        start.setHours(0, 0, 0, 0);
        updateData.status = start <= today ? 'current' : 'upcoming';
      }

      const updatedOffer = await OfferModel.update(req.params.id, updateData);

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
      const offer = await OfferModel.findById(req.params.id);
      if (!offer) {
        return res.status(404).json({
          success: false,
          message: 'Offer not found'
        });
      }

      await OfferModel.delete(req.params.id);

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
