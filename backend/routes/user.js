const express = require("express");
const { getUserValidator, createUserValidator, updateUserValidator, deleteUserValidator, changePasswordValidator } = require("../utils/validators/userValidator");

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    changeUserPassword,
    getUserByRole
} = require("../services/userService");

const authService = require("../services/authService");
const { getParentByKid } = require("../services/kidService");

const router = express.Router();
/**
* @swagger
* tags:
*   name: Users
*   description: The users managing API
* /api/v0/users:
*   get:
*     summary: Lists all the users
*     tags: [Users]
*     responses:
*       200:
*         description: The list of users
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/User'
*   post:
*     summary: Create a new user
*     tags: [Users]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: The created user.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       500:
*         description: Some server error
* /api/v0/users/{id}:
*   get:
*     summary: Get the user by ID
*     tags: [Users]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The user ID
*     responses:
*       200:
*         description: The user response by ID
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       404:
*         description: The user was not found
*   patch:
*     summary: Update the user by ID
*     tags: [Users]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The user ID
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: The user was updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       404:
*         description: The user was not found
*       500:
*         description: Some server error happened
*   delete:
*     summary: Remove the user by ID
*     tags: [Users]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The user ID
*     responses:
*       200:
*         description: The user was deleted
*       404:
*         description: The user was not found
* /api/v0/users/role/{role}:
 *   get:
 *     summary: Get users by role
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: role
 *         schema:
 *           type: string
 *         required: true
 *         description: The user role
 *     responses:
 *       200:
 *         description: The users with the specified role
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid role
 *       404:
 *         description: No users found with the specified role
 */
router
    .route('/')
    .get(authService.protect(['admin']), getUsers)
    .post(authService.protect(['admin']), createUser, createUserValidator)

router
    .route('/:id')
    .get(authService.protect(['admin']), getUserValidator, getUser)
    .patch(authService.protect(['admin']), updateUserValidator, updateUser)
    .delete(authService.protect(['admin']), deleteUserValidator, deleteUser);

router
    .route('/parent-by-kid/:kidId') // New route for getting parent by kid ID
    .get(authService.protect(['admin', 'parent']), getParentByKid);

router
    .route('/role/:role')
    .get(authService.protect(['admin']), getUserByRole);

router.patch('/change-password/:id', changePasswordValidator, changeUserPassword)

module.exports = router;