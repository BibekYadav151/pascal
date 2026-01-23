const University = require('../models/universityModel');

exports.getUniversities = async (req, res) => {
    try {
        const universities = await University.find().sort({ name: 1 });
        res.status(200).json({ success: true, count: universities.length, data: universities });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

exports.getUniversity = async (req, res) => {
    try {
        const university = await University.findById(req.params.id);
        if (!university) {
            return res.status(404).json({ success: false, message: 'University not found' });
        }
        res.status(200).json({ success: true, data: university });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

exports.createUniversity = async (req, res) => {
    try {
        const university = await University.create(req.body);
        res.status(201).json({ success: true, data: university });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid data', error: error.message });
    }
};

exports.updateUniversity = async (req, res) => {
    try {
        const university = await University.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!university) {
            return res.status(404).json({ success: false, message: 'University not found' });
        }
        res.status(200).json({ success: true, data: university });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid data', error: error.message });
    }
};

exports.deleteUniversity = async (req, res) => {
    try {
        const university = await University.findByIdAndDelete(req.params.id);
        if (!university) {
            return res.status(404).json({ success: false, message: 'University not found' });
        }
        res.status(200).json({ success: true, message: 'University deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};
