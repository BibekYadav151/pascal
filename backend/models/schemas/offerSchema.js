const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    validUntil: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
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

// Create indexes
offerSchema.index({ status: 1 });
offerSchema.index({ category: 1 });
offerSchema.index({ startDate: 1 });

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
