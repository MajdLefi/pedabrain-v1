const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcrypt");
const createToken = require('../utils/createToken')
const factory = require('./handlersFactory')

exports.signup = factory.signup(User);

exports.login = factory.login(User);

exports.protect = (allowedRoles) => asyncHandler(async (req, res, next) => {
    // 1) Check if token exists
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(
            new ApiError(
                'You are not logged in. Please log in to access this route',
                401
            )
        );
    }

    // 2) Verify token (no change happens, expired token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 3) Check if user exists in any of the three models
    let currentUser;
    currentUser = await User.findById(decoded.userId);
    // 4) Check if user exists and has the allowed role
    if (!currentUser || !allowedRoles.includes(currentUser.role)) {
        return next(
            new ApiError(
                'You do not have permission to access this route',
                403
            )
        );
    }
    req.user = currentUser;
    next();
});

