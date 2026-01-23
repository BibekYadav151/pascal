const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    timeSlots: [{
        time: { type: String, required: true },
        available: { type: Boolean, default: true }
    }],
    duration: {
        type: String,
        required: true
    },
    fee: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Class', classSchema);
