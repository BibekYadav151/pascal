const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Team = require('../models/teamModel');

// Protect routes - verify JWT
exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password').populate('team');

            if (!req.user) {
                return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    };
};

// Check for specific permission
exports.checkPermission = (permission) => {
    return (req, res, next) => {
        // Superadmin has all permissions
        if (req.user.role === 'superadmin') {
            return next();
        }

        if (!req.user.team) {
            return res.status(403).json({
                success: false,
                message: 'No team assigned, access denied'
            });
        }

        if (req.user.team.permissions.includes(permission)) {
            return next();
        }

        res.status(403).json({
            success: false,
            message: `You do not have permission to access ${permission}`
        });
    };
};
