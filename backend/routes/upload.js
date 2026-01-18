const express = require('express');
const uploadController = require('../controllers/uploadController');

const router = express.Router();

// Upload blog cover image
router.post('/blog-cover', uploadController.uploadBlogCover);

// Upload university logo
router.post('/university-logo', uploadController.uploadUniversityLogo);

// Upload hero image
router.post('/hero-image', uploadController.uploadHeroImage);

// Upload offer image
router.post('/offer-image', uploadController.uploadOfferImage);

// Delete uploaded file
router.delete('/file/:filename', uploadController.deleteFile);

module.exports = router;