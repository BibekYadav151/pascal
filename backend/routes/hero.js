const express = require('express');
const router = express.Router();
const heroController = require('../controllers/heroController');

// GET /api/hero/active - Get active hero content
router.get('/active', heroController.getActiveHero);

// GET /api/hero - Get all heroes
router.get('/', heroController.getAllHeroes);

// POST /api/hero - Create new hero
router.post('/', heroController.createHero);

// PUT /api/hero/active - Set active hero
router.put('/active', heroController.setActiveHero);

// PUT /api/hero/:id - Update hero
router.put('/:id', heroController.updateHero);

// DELETE /api/hero/:id - Delete hero
router.delete('/:id', heroController.deleteHero);

module.exports = router;