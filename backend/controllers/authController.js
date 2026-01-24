const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Team = require('../models/teamModel');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d'
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public (should be protected in production)
exports.register = async (req, res) => {
    try {
        const { name, email, password, role, teamName, permissions } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Handle Team creation or assignment
        let teamId = null;
        if (teamName) {
            let team = await Team.findOne({ name: teamName });
            if (!team) {
                // Create new team if it doesn't exist and permissions are provided
                team = await Team.create({
                    name: teamName,
                    permissions: permissions || []
                });
            }
            teamId = team._id;
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'staff',
            team: teamId
        });

        if (user) {
            res.status(201).json({
                success: true,
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    team: user.team,
                    token: generateToken(user._id)
                }
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Invalid user data'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user email
        const user = await User.findOne({ email }).select('+password').populate('team');

        if (user && (await user.matchPassword(password))) {
            // Update last login
            user.lastLogin = Date.now();
            await user.save({ validateBeforeSave: false });

            res.json({
                success: true,
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    team: user.team,
                    token: generateToken(user._id)
                }
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('team');

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
