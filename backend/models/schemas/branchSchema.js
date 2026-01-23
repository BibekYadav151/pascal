const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    hours: {
        type: String,
        default: 'Sun-Fri: 9:00 AM - 6:00 PM'
    },
    mapUrl: {
        type: String,
        default: '#'
    },
    isMain: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Create indexes
branchSchema.index({ location: 1 });
branchSchema.index({ isMain: 1 });

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;
