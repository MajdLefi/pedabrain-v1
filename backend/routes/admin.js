const express = require("express");
const {
    // getAdminValidator,
    // createAdminValidator,
    // updateAdminValidator,
    // deleteAdminValidator,
    changePasswordAdminValidator
} = require("../utils/validators/agentValidator");
const authService = require("../services/authService");

const {
    getAdmins,
    getAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    uploadAdminImage,
    //resizeImage,
    changeAdminPassword
} = require("../services/adminService");

const router = express.Router();

router
    .route('/')
    .get(getAdmins)
    .post(createAdmin)

// router
//     .route('/:id')
//     .get(getAdminValidator, getAdmin)
//     .patch(uploadAdminImage, updateAdminValidator, updateAdmin)
//     .delete(deleteAdminValidator, deleteAdmin);

router.patch('/change-password/:id', authService.protect(['admin']), changePasswordAdminValidator, changeAdminPassword)

module.exports = router;