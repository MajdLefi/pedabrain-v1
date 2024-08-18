const { check } = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/User');

const isEmailInUse = (value, userModel) => {
    return userModel.findOne({ email: value }).then((user) => {
        if (user) {
            return Promise.reject(new Error('User exists'));
        }
    });
};

exports.signupValidator = (userModel) => [
    check('email')
    .notEmpty()
    .withMessage('Email is required'),

    // check('fullName')
    // .notEmpty()
    // .withMessage('Fullname is required'),

    // check('cin')
    // .notEmpty()
    // .withMessage('Cin is required')
    // .custom((val) => isEmailInUse(val, userModel)),

    // check('gender')
    // .notEmpty()
    // .withMessage('Gender is required')
    // .isIn(['male', 'female'])
    // .withMessage('Invalid gender'),

    // check('role')
    // .notEmpty()
    // .withMessage('Role is required')
    // .isIn(['accountant', 'receptionnist', 'roomKeeper', 'governorate'])
    // .withMessage('Invalid role'),

    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .custom((password, { req }) => {
            if (password !== req.body.passwordConfirm) {
                throw new Error('Password Confirmation does not match');
            }
            return true;
        }),

    check('passwordConfirm')
        .notEmpty()
        .withMessage('Password confirmation is required'),

    validatorMiddleware,
];

exports.loginValidator = [
    check('email')
        .notEmpty(),
        // .withMessage('Cin is required')
        // .withMessage('Invalid cin'),

    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),

    validatorMiddleware,
];

//User
exports.signupUserValidator = exports.signupValidator(User);
exports.loginUserValidator = exports.loginValidator;
