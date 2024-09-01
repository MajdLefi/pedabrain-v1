const asyncHandler = require('express-async-handler');
const factory = require('./handlersFactory');
const Kid = require('../models/Kid');
const User = require('../models/User');

// @desc    Get list of kids
// @route   GET /api/v1/kids
// @access  Private/User
exports.getKids = factory.getAll(Kid);

// @desc    Get specific kid by id
// @route   GET /api/v1/kids/:id
// @access  Private/User
exports.getKid = factory.getOne(Kid);

// @desc    Get kids by parent ID
// @route   GET /api/v1/kids/parent/:parentId
// @access  Private/User
exports.getKidsByParent = asyncHandler(async (req, res, next) => {
    const { parentId } = req.params;
    const kids = await Kid.find({ parentId });

    if (!kids.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'No kids found for this parent',
        });
    }

    res.status(200).json({
        status: 'success',
        results: kids.length,
        data: kids,
    });
});

// @desc    Get parent by kid's ID
// @route   GET /api/v1/users/parent-by-kid/:kidId
// @access  Private/User
exports.getParentByKid = asyncHandler(async (req, res, next) => {
    const { kidId } = req.params;

    const kid = await Kid.findById(kidId).populate('parentId');

    if (!kid || !kid.parentId) {
        return res.status(404).json({
            status: 'fail',
            message: 'No parent found for the given kid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: kid.parentId
    });
});

// @desc    Create kid
// @route   POST /api/v1/kids
// @access  Private/User
// exports.createKid = factory.createOne(Kid);
exports.createKid = asyncHandler(async (req, res, next) => {
    const { parentId } = req.body;

    // Create the new kid
    const kid = await Kid.create(req.body);

    // Add the kid's ID to the parent's kids array
    await User.findByIdAndUpdate(parentId, { $push: { kids: kid._id } });

    res.status(201).json({
        status: 'success',
        data: kid,
    });
});
// @desc    Update specific kid
// @route   PUT /api/v1/kids/:id
// @access  Private/User
exports.updateKid = factory.updateOne(Kid);

// @desc    Delete specific kid
// @route   DELETE /api/v1/kids/:id
// @access  Private/User
exports.deleteKid = factory.deleteOne(Kid);

// @desc    Deactivate logged kid
// @route   DELETE /api/v1/kids/deleteMe
// @access  Private/Protect
exports.deleteLoggedKidData = asyncHandler(async (req, res, next) => {
    await Kid.findByIdAndUpdate(req.user._id, { active: false });
    res.status(204).json({ status: 'Success' });
});

