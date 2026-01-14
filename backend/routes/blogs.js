const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Get all blogs with optional filtering
router.get('/', blogController.getAllBlogs);

// Get all categories
router.get('/categories', blogController.getCategories);

// Get all tags
router.get('/tags', blogController.getTags);

// Get related blogs
router.get('/related/:id/:category', blogController.getRelatedBlogs);

// Get single blog by ID
router.get('/id/:id', blogController.getBlogById);

// Get single blog by slug
router.get('/slug/:slug', blogController.getBlogBySlug);

// Create new blog
router.post('/', blogController.createBlog);

// Update blog
router.put('/:id', blogController.updateBlog);

// Delete blog
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
