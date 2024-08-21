const authRoute = require('./authRoute');
//const adminRoute = require('./admin');
const userRoute = require('./user');
const { swaggerUi, specs } = require('./../utils/swagger');
const path = require('path');
const express = require('express')

const mountRoutes = (app) => {
  //app.use('/api/v0/admin', adminRoute);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  app.use('/api/v0/auth', authRoute);
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
 */

  app.use('/api/v0/users', userRoute);
  //app.use('/uploads/invoices', express.static(path.join(__dirname, 'uploads/invoices')));
};

module.exports = mountRoutes;