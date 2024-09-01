const express = require("express");
const {
    getSessions,
    getSessionById,
    createSession,
    updateSession,
    deleteSession
} = require("../services/sessionService");

const authService = require("../services/authService");

const router = express.Router();

/**
* @swagger
* tags:
*   name: Sessions
*   description: The session managing API
* /api/v0/sessions:
*   get:
*     summary: Lists all the sessions
*     tags: [Sessions]
*     responses:
*       200:
*         description: The list of sessions
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Session'
*   post:
*     summary: Create a new session
*     tags: [Sessions]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Session'
*     responses:
*       200:
*         description: The created session.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Session'
*       500:
*         description: Some server error
* /api/v0/sessions/{id}:
*   get:
*     summary: Get the session by ID
*     tags: [Sessions]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The session ID
*     responses:
*       200:
*         description: The session response by ID
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Session'
*       404:
*         description: The session was not found
*   patch:
*     summary: Update the session by ID
*     tags: [Sessions]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The session ID
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Session'
*     responses:
*       200:
*         description: The session was updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Session'
*       404:
*         description: The session was not found
*       500:
*         description: Some server error happened
*   delete:
*     summary: Remove the session by ID
*     tags: [Sessions]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The session ID
*     responses:
*       200:
*         description: The session was deleted
*       404:
*         description: The session was not found
*/

router
    .route('/')
    .get(authService.protect(['admin']), getSessions)
    .post(authService.protect(['admin']), createSession)

router
    .route('/:id')
    .get(authService.protect(['admin']), getSessionById)
    .patch(authService.protect(['admin']), updateSession)
    .delete(authService.protect(['admin']), deleteSession);

module.exports = router;
