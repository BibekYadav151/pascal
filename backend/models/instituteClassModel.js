const mongoose = require('mongoose');

const instituteClassSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: String,
        required: true
    },
    fee: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    bulletPoints: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('InstituteClass', instituteClassSchema);
