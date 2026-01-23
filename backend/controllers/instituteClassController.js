const InstituteClass = require('../models/instituteClassModel');

exports.getInstituteClasses = async (req, res) => {
    try {
        const classes = await InstituteClass.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: classes.length, data: classes });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

exports.getInstituteClass = async (req, res) => {
    try {
        const classItem = await InstituteClass.findById(req.params.id);
        if (!classItem) {
            return res.status(404).json({ success: false, message: 'Institute Class not found' });
        }
        res.status(200).json({ success: true, data: classItem });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

exports.createInstituteClass = async (req, res) => {
    try {
        const classItem = await InstituteClass.create(req.body);
        res.status(201).json({ success: true, data: classItem });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid data', error: error.message });
    }
};

exports.updateInstituteClass = async (req, res) => {
    try {
        const classItem = await InstituteClass.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!classItem) {
            return res.status(404).json({ success: false, message: 'Institute Class not found' });
        }
        res.status(200).json({ success: true, data: classItem });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid data', error: error.message });
    }
};

exports.deleteInstituteClass = async (req, res) => {
    try {
        const classItem = await InstituteClass.findByIdAndDelete(req.params.id);
        if (!classItem) {
            return res.status(404).json({ success: false, message: 'Institute Class not found' });
        }
        res.status(200).json({ success: true, message: 'Institute Class deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};
