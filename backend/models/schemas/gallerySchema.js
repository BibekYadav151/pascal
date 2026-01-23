const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    coverImage: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }]
}, {
    timestamps: true
});

// Create indexes
gallerySchema.index({ createdAt: -1 });

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
