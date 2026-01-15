const express = require('express');
const uploadController = require('../controllers/uploadController');

const router = express.Router();

// Upload blog cover image
router.post('/blog-cover', uploadController.uploadBlogCover);

// Delete uploaded file
router.delete('/file/:filename', uploadController.deleteFile);

module.exports = router;