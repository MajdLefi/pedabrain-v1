const express = require("express");
const { getUserValidator, createUserValidator, updateUserValidator, deleteUserValidator, changePasswordValidator} = require("../utils/validators/userValidator");

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    changeUserPassword
} = require("../services/userService");

const authService = require("../services/authService");

const router = express.Router();

router
    .route('/')
    .get(authService.protect(['admin']), getUsers)
    .post(authService.protect(['admin']), createUser, createUserValidator)

router
    .route('/:id')
    .get(authService.protect(['admin']), getUserValidator, getUser)
    .patch(authService.protect(['admin']), updateUserValidator, updateUser)
    .delete(authService.protect(['admin']), deleteUserValidator, deleteUser);

router.patch('/change-password/:id', changePasswordValidator, changeUserPassword)

module.exports = router;