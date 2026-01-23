const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    excerpt: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tableOfContents: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    imageUrl: {
        type: String,
        default: ''
    },
    readTime: {
        type: String,
        default: '5 min'
    },
    featured: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['Draft', 'Published', 'Archived'],
        default: 'Draft'
    }
}, {
    timestamps: true
});

// Create indexes for better query performance
blogSchema.index({ category: 1 });
blogSchema.index({ status: 1 });
blogSchema.index({ featured: 1 });
blogSchema.index({ tags: 1 });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
