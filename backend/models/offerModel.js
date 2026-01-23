const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    discount: {
        type: String,
        required: [true, 'Discount amount/text is required']
    },
    startDate: {
        type: String,
        required: [true, 'Start date is required']
    },
    validUntil: {
        type: String,
        required: [true, 'Valid until date is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Test Prep', 'Package', 'Group', 'Referral', 'Seasonal', 'Partnership']
    },
    status: {
        type: String,
        enum: ['current', 'upcoming', 'expired'],
        default: 'current'
    },
    bgColor: {
        type: String,
        default: 'bg-blue-500'
    },
    terms: [{
        type: String
    }]
}, {
    timestamps: true
});

// Indexes for filtering
offerSchema.index({ status: 1 });
offerSchema.index({ category: 1 });
offerSchema.index({ startDate: 1 });
offerSchema.index({ createdAt: -1 });

const Offer = mongoose.model('Offer', offerSchema);
module.exports = Offer;
