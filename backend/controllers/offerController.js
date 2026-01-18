const offerModel = require('../models/offerModel');

class OfferController {
  // Get all offers
  async getAllOffers(req, res) {
    try {
      const offers = await offerModel.findAll();
      res.json(offers);
    } catch (error) {
      console.error('Error fetching offers:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Get active offers
  async getActiveOffers(req, res) {
    try {
      const offers = await offerModel.findActiveOffers();
      res.json(offers);
    } catch (error) {
      console.error('Error fetching active offers:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Get upcoming offers
  async getUpcomingOffers(req, res) {
    try {
      const offers = await offerModel.findUpcomingOffers();
      res.json(offers);
    } catch (error) {
      console.error('Error fetching upcoming offers:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Get offer by ID
  async getOfferById(req, res) {
    try {
      const { id } = req.params;
      const offer = await offerModel.findById(id);
      
      if (!offer) {
        return res.status(404).json({ message: 'Offer not found' });
      }
      
      res.json(offer);
    } catch (error) {
      console.error('Error fetching offer:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Create new offer
  async createOffer(req, res) {
    try {
      const {
        title,
        description,
        discount,
        validUntil,
        category,
        terms,
        status = 'active'
      } = req.body;

      const offerData = {
        title,
        description,
        discount,
        validUntil,
        category,
        terms: terms || [],
        status
      };

      const offer = await offerModel.create(offerData);
      res.status(201).json(offer);
    } catch (error) {
      console.error('Error creating offer:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Update offer
  async updateOffer(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const offer = await offerModel.update(id, updates);
      if (!offer) {
        return res.status(404).json({ message: 'Offer not found' });
      }
      
      res.json(offer);
    } catch (error) {
      console.error('Error updating offer:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Delete offer
  async deleteOffer(req, res) {
    try {
      const { id } = req.params;
      
      const deleted = await offerModel.delete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Offer not found' });
      }
      
      res.json({ message: 'Offer deleted successfully' });
    } catch (error) {
      console.error('Error deleting offer:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new OfferController();