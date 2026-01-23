const express = require('express');
const router = express.Router();

// Import route modules
const blogRoutes = require('./blogs');
const galleryRoutes = require('./gallery');
const offerRoutes = require('./offers');
const branchRoutes = require('./branches');
const uploadRoutes = require('./upload');
const classRoutes = require('./classes');
const instituteClassRoutes = require('./instituteClasses');
const programRoutes = require('./programs');
const universityRoutes = require('./universities');
// const userRoutes = require('./users');
// const authRoutes = require('./auth');

// Mount routes
router.use('/blogs', blogRoutes);
router.use('/gallery', galleryRoutes);
router.use('/offers', offerRoutes);
router.use('/branches', branchRoutes);
router.use('/upload', uploadRoutes);
router.use('/classes', classRoutes);
router.use('/institute-classes', instituteClassRoutes);
router.use('/programs', programRoutes);
router.use('/universities', universityRoutes);
// router.use('/users', userRoutes);
// router.use('/auth', authRoutes);

// Example route
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      blogs: '/blogs',
      gallery: '/gallery',
      offers: '/offers',
      branches: '/branches',
      // users: '/users',
      // auth: '/auth'
    }
  });
});

module.exports = router;