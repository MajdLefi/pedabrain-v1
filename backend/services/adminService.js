//const sharp = require('sharp');
const asyncHandler = require('express-async-handler')
const factory = require('./handlersFactory')
const bcrypt = require('bcrypt');
const ApiError = require('../utils/apiError');
const Admin = require('../models/Hotel/Admin');

// @desc    Get list of admins
// @route   GET /api/v1/admins
// @access  Private/Admin
exports.getAdmins = factory.getAll(Admin);
// @desc    Get specific admin by id
// @route   GET /api/v1/admins/:id
// @access  Private/Admin
exports.getAdmin = factory.getOne(Admin);
// @desc    Create admin
// @route   POST  /api/v1/admins
// @access  Private/Admin
exports.createAdmin = factory.createOne(Admin);
// @desc    Update specific admin
// @route   PUT /api/v1/admins/:id
// @access  Private/Admin
exports.updateAdmin = factory.updateOne(Admin)
// @desc    Delete specific admin
// @route   DELETE /api/v1/admins/:id
// @access  Private/Admin
exports.deleteAdmin = factory.deleteOne(Admin);
// @desc    Deactivate logged admin
// @route   DELETE /api/v1/admins/deleteMe
// @access  Private/Protect
exports.deleteLoggedAdminData = asyncHandler(async (req, res, next) => {
    await Admin.findByIdAndUpdate(req.admin._id, { active: false });
    res.status(204).json({ status: 'Success' });
});

exports.changeAdminPassword = factory.changeUserPassword(Admin);
