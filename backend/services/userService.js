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
