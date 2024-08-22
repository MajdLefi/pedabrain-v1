const asyncHandler = require('express-async-handler')
const factory = require('./handlersFactory')
const User = require('../models/User');

// @desc    Get list of users
// @route   GET /api/v1/users
// @access  Private/User
exports.getUsers = factory.getAll(User);

// @desc    Get specific user by id
// @route   GET /api/v1/users/:id
// @access  Private/User
exports.getUser = factory.getOne(User);

// @desc    Get users by role
// @route   GET /api/v1/users/role/:role
// @access  Private/User
exports.getUserByRole = asyncHandler(async (req, res, next) => {
    const validRoles = ['admin', 'kid', 'parent', 'teacher']; // List of valid roles
    const role = req.params.role;

    // Validate if the role is in the validRoles array
    if (!validRoles.includes(role)) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid role'
        });
    }

    const users = await User.find({ role });

    if (!users || users.length === 0) {
        return res.status(404).json({
            status: 'fail',
            message: `No users found with the role: ${role}`
        });
    }

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    });
});

// @desc    Create user
// @route   POST  /api/v1/users
// @access  Private/User
exports.createUser = factory.createOne(User);
// @desc    Update specific user
// @route   PUT /api/v1/users/:id
// @access  Private/User

exports.updateUser = factory.updateOne(User)
// @desc    Delete specific user
// @route   DELETE /api/v1/users/:id
// @access  Private/User

exports.deleteUser = factory.deleteOne(User);
// @desc    Deactivate logged user
// @route   DELETE /api/v1/users/deleteMe
// @access  Private/Protect

exports.deleteLoggedUserData = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user._id, { active: false });
    res.status(204).json({ status: 'Success' });
});

exports.changeUserPassword = factory.changeUserPassword(User);

