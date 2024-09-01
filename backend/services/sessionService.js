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
