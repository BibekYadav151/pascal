const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  coverImage: {
    type: String,
    required: [true, 'Cover image is required']
  },
  images: [{
    type: String
  }]
}, {
  timestamps: true
});

// Index for sorting by newest first
gallerySchema.index({ createdAt: -1 });

const Gallery = mongoose.model('Gallery', gallerySchema);
module.exports = Gallery;
