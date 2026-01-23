const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Branch name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true
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

// Indexes
branchSchema.index({ location: 1 });
branchSchema.index({ isMain: 1 });

const Branch = mongoose.model('Branch', branchSchema);
module.exports = Branch;
