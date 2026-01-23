const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    university: {
        type: String,
        required: true
    },
    universityLogo: {
        type: String
    },
    country: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    studyMode: {
        type: String,
        required: true
    },
    ieltsRequired: {
        type: Boolean,
        default: true
    },
    ieltsScore: {
        type: String
    },
    languageTest: {
        type: String
    },
    studyLevel: {
        type: String,
        required: true
    },
    intakeDates: [{
        type: String
    }],
    tuitionFee: {
        type: String,
        required: true
    },
    requirements: [{
        type: String
    }],
    description: {
        type: String,
        required: true
    },
    scholarshipInfo: {
        type: String
    },
    careerOpportunities: [{
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

module.exports = mongoose.model('Program', programSchema);
