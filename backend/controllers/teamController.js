const Team = require('../models/teamModel');

// @desc    Get all teams
// @route   GET /api/teams
// @access  Private/Admin
exports.getTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.json({ success: true, data: teams });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create a team
// @route   POST /api/teams
// @access  Private/Admin
exports.createTeam = async (req, res) => {
    try {
        const { name, description, permissions } = req.body;

        const teamExists = await Team.findOne({ name });
        if (teamExists) {
            return res.status(400).json({ success: false, message: 'Team already exists' });
        }

        const team = await Team.create({
            name,
            description,
            permissions: permissions || []
        });

        res.status(201).json({ success: true, data: team });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update a team
// @route   PUT /api/teams/:id
// @access  Private/Admin
exports.updateTeam = async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!team) {
            return res.status(404).json({ success: false, message: 'Team not found' });
        }

        res.json({ success: true, data: team });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete a team
// @route   DELETE /api/teams/:id
// @access  Private/Admin
exports.deleteTeam = async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);

        if (!team) {
            return res.status(404).json({ success: false, message: 'Team not found' });
        }

        res.json({ success: true, message: 'Team deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
