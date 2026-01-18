const heroModel = require('../models/heroModel');

class HeroController {
  // Get active hero content
  async getActiveHero(req, res) {
    try {
      const hero = await heroModel.getActiveHero();
      if (!hero) {
        return res.status(404).json({ message: 'No active hero found' });
      }
      res.json(hero);
    } catch (error) {
      console.error('Error fetching hero:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Get all hero entries
  async getAllHeroes(req, res) {
    try {
      const heroes = await heroModel.findAll();
      res.json(heroes);
    } catch (error) {
      console.error('Error fetching heroes:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Create new hero
  async createHero(req, res) {
    try {
      const {
        title,
        description,
        buttonText1,
        buttonText2,
        buttonLink1,
        buttonLink2,
        images,
        isActive = false
      } = req.body;

      const heroData = {
        title,
        description,
        buttonText1,
        buttonText2,
        buttonLink1,
        buttonLink2,
        images: images || [],
        isActive
      };

      const hero = await heroModel.create(heroData);
      res.status(201).json(hero);
    } catch (error) {
      console.error('Error creating hero:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Update hero
  async updateHero(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const hero = await heroModel.update(id, updates);
      if (!hero) {
        return res.status(404).json({ message: 'Hero not found' });
      }
      
      res.json(hero);
    } catch (error) {
      console.error('Error updating hero:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Delete hero
  async deleteHero(req, res) {
    try {
      const { id } = req.params;
      
      const deleted = await heroModel.delete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Hero not found' });
      }
      
      res.json({ message: 'Hero deleted successfully' });
    } catch (error) {
      console.error('Error deleting hero:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Set active hero
  async setActiveHero(req, res) {
    try {
      const heroData = req.body;
      const hero = await heroModel.updateActiveHero(heroData);
      res.json(hero);
    } catch (error) {
      console.error('Error setting active hero:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new HeroController();