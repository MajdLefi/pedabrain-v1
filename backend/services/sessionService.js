const asyncHandler = require('express-async-handler');
const factory = require('./handlersFactory');
const ApiError = require('../utils/apiError');
const Session = require('../models/Session');

// @desc    Get list of sessions
// @route   GET /api/v0/sessions
// @access  Private/Session
exports.getSessions = factory.getAll(Session);

// @desc    Get specific session by id
// @route   GET /api/v0/sessions/:id
// @access  Private/Session
exports.getSessionById = factory.getOne(Session);

// @desc    Get list of done sessions
// @route   GET /api/v0/sessions/done
// @access  Private/Session
exports.getDoneSessions = asyncHandler(async (req, res, next) => {
    const sessions = await Session.find({ status: 'done' });

    res.status(200).json({
        status: 'success',
        results: sessions.length,
        data: sessions
    });
});

// @desc    Get list of sessions by parent ID
// @route   GET /api/v0/sessions/parent/:parentId
// @access  Private/Session
exports.getSessionsByParent = asyncHandler(async (req, res, next) => {
    const { parentId } = req.params;
    const sessions = await Session.find({ parent: parentId });

    if (!sessions) {
        return next(new ApiError('No sessions found for this parent ID', 404));
    }

    res.status(200).json({
        status: 'success',
        results: sessions.length,
        data: sessions
    });
});

// @desc    Get list of done sessions by parent ID
// @route   GET /api/v0/sessions/done/parent/:parentId
// @access  Private/Session
exports.getDoneSessionsByParent = asyncHandler(async (req, res, next) => {
    const { parentId } = req.params;
    const sessions = await Session.find({ parent: parentId, status: 'done' });

    if (!sessions) {
        return next(new ApiError('No done sessions found for this parent ID', 404));
    }

    res.status(200).json({
        status: 'success',
        results: sessions.length,
        data: sessions
    });
});

// @desc    Create session
// @route   POST  /api/v0/sessions
// @access  Private/Session
exports.createSession = factory.createOne(Session);

// @desc    Update specific session
// @route   PUT /api/v0/sessions/:id
// @access  Private/Session
exports.updateSession = factory.updateOne(Session);

// @desc    Delete specific session
// @route   DELETE /api/v0/sessions/:id
// @access  Private/Session
exports.deleteSession = factory.deleteOne(Session);
