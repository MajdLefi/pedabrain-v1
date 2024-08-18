const { check, body } = require('express-validator')
const bcrypt = require("bcrypt");
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/User');

const isEmailInUse = (value, userModel) => {
    return userModel.findOne({ email: value }).then((user) => {
        if (user) {
            return Promise.reject(new Error('user exists'));
        }
    });
};

exports.getUserValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid user id format'),

    validatorMiddleware,
];

exports.createValidator = (userModel) => [
    check('email')
        .notEmpty()
        .withMessage('email is required')
        .custom((val) => isEmailInUse(val, userModel))
        .withMessage('email exists'),

    check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .custom((password, { req }) => {
            if (password !== req.body.passwordConfirm) {
                throw new Error('Password Confirmation incorrect');
            }
            return true;
        }),

    check('passwordConfirm')
        .notEmpty()
        .withMessage('Password confirmation required'),

    validatorMiddleware,
];

exports.createUserValidator = exports.createValidator(User);

exports.updateUserValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),

    body('email')
        .optional()
        .notEmpty()
        .withMessage('email required')
        .custom((val, { req }) => {
            if (val !== req.body.email) {
                return User.findOne({ email: val }).then((user) => {
                    if (user) {
                        return Promise.reject(new Error('User email exists'));
                    }
                });
            }
            return true;
        }),

    validatorMiddleware,
];

exports.deleteUserValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User id format'),
    validatorMiddleware,
];

exports.changePasswordValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),
    body("currentPassword").notEmpty().withMessage("You should enter your current password"),
    body("newPasswordConfirm").notEmpty().withMessage("You must enter the password confirm"),
    body('newPassword').notEmpty().withMessage('You must enter new password')
        .custom(async (val, { req }) => {
            const user = await User.findById(req.params.id)
            if (!user) {
                throw new Error("There is no User for this id")
            }
            const isCorrectPassword = await bcrypt.compare(
                req.body.currentPassword,
                user.password
            )
            if (!isCorrectPassword) {
                throw new Error("Incorrect current password")
            }
            if (val !== req.body.newPasswordConfirm) {
                throw new Error('Password Confirmation incorrect');
            }
            return true
        }),
    validatorMiddleware
]