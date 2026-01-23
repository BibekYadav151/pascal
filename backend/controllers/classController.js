const Class = require('../models/classModel');

exports.getClasses = async (req, res) => {
    try {
        const classes = await Class.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: classes.length, data: classes });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

exports.getClass = async (req, res) => {
    try {
        const classItem = await Class.findById(req.params.id);
        if (!classItem) {
            return res.status(404).json({ success: false, message: 'Class not found' });
        }
        res.status(200).json({ success: true, data: classItem });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

exports.createClass = async (req, res) => {
    try {
        const classItem = await Class.create(req.body);
        res.status(201).json({ success: true, data: classItem });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid data', error: error.message });
    }
};

exports.updateClass = async (req, res) => {
    try {
        const classItem = await Class.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!classItem) {
            return res.status(404).json({ success: false, message: 'Class not found' });
        }
        res.status(200).json({ success: true, data: classItem });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid data', error: error.message });
    }
};

exports.deleteClass = async (req, res) => {
    try {
        const classItem = await Class.findByIdAndDelete(req.params.id);
        if (!classItem) {
            return res.status(404).json({ success: false, message: 'Class not found' });
        }
        res.status(200).json({ success: true, message: 'Class deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};
