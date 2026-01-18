const express = require('express');
const router = express.Router();

// Import route modules
const blogRoutes = require('./blogs');
const uploadRoutes = require('./upload');
const heroRoutes = require('./hero');
const offerRoutes = require('./offers');
const branchRoutes = require('./branches');
// const userRoutes = require('./users');
// const authRoutes = require('./auth');

// Mount routes
router.use('/blogs', blogRoutes);
router.use('/upload', uploadRoutes);
router.use('/hero', heroRoutes);
router.use('/offers', offerRoutes);
router.use('/branches', branchRoutes);
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
      // users: '/users',
      // auth: '/auth'
    }
  });
});

module.exports = router;