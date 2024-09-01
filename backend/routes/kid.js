const express = require('express');
const {
    getKids,
    getKid,
    createKid,
    updateKid,
    deleteKid,
    deleteLoggedKidData,
    getKidsByParent,
} = require('../services/kidService');
const authService = require('../services/authService');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Kids
 *   description: The kids managing API
 */

/**
 * @swagger
 * /api/v1/kids:
 *   get:
 *     summary: Lists all the kids
 *     tags: [Kids]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of kids
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Kid'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new kid
 *     tags: [Kids]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Kid object that needs to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Kid'
 *     responses:
 *       201:
 *         description: The created kid.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Kid'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router
    .route('/')
    .get(authService.protect(['admin', 'parent']), getKids)
    .post(authService.protect(['admin', 'parent']), createKid);

/**
 * @swagger
 * /api/v1/kids/{id}:
 *   get:
 *     summary: Get a specific kid by ID
 *     tags: [Kids]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The kid ID
 *     responses:
 *       200:
 *         description: The kid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Kid'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Kid not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a specific kid by ID
 *     tags: [Kids]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The kid ID
 *     requestBody:
 *       description: Kid object that needs to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Kid'
 *     responses:
 *       200:
 *         description: The updated kid.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Kid'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Kid not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a specific kid by ID
 *     tags: [Kids]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The kid ID
 *     responses:
 *       200:
 *         description: The kid was deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Kid not found
 *       500:
 *         description: Server error
 */
router
    .route('/:id')
    .get(authService.protect(['admin', 'parent']), getKid)
    .patch(authService.protect(['admin', 'parent']), updateKid)
    .delete(authService.protect(['admin', 'parent']), deleteKid);

/**
 * @swagger
 * /api/v1/kids/parent/{parentId}:
 *   get:
 *     summary: Get kids by parent ID
 *     tags: [Kids]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: parentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The parent ID
 *     responses:
 *       200:
 *         description: The kids belonging to the specified parent
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Kid'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No kids found for this parent
 *       500:
 *         description: Server error
 */
router
    .route('/parent/:parentId')
    .get(authService.protect(['admin', 'parent']), getKidsByParent);

/**
 * @swagger
 * /api/v1/kids/deleteMe:
 *   delete:
 *     summary: Deactivate the logged kid
 *     tags: [Kids]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Successfully deactivated the kid
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete('/deleteMe', authService.protect(['admin', 'parent']), deleteLoggedKidData);

module.exports = router;
