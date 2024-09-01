const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PEDABRAIN API with Swagger',
      version: '1.0.0',
      description: 'PEDABRAIN API application documented with Swagger',
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'password'],
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the user',
            },
            firstName: {
              type: 'string',
              description: 'The first name of the user',
              example: 'John',
            },
            lastName: {
              type: 'string',
              description: 'The last name of the user',
              example: 'Doe',
            },
            email: {
              type: 'string',
              description: 'The email of the user',
              example: 'john.doe@example.com',
            },
            gender: {
              type: 'string',
              description: 'The gender of the user',
              enum: ['male', 'female'],
              example: 'male',
            },
            birthday: {
              type: 'string',
              format: 'date',
              description: 'The birthday of the user',
              example: '1990-01-01',
            },
            location: {
              type: 'string',
              description: 'The location of the user',
              example: 'New York, USA',
            },
            phone: {
              type: 'string',
              description: 'The phone number of the user',
              example: '+1234567890',
            },
            problem: {
              type: 'string',
              description: 'The problem or issue reported by the user',
              example: 'Difficulty in learning',
            },
            role: {
              type: 'string',
              description: 'The role of the user',
              enum: ['admin', 'student', 'parent'],
              example: 'admin',
            },
            password: {
              type: 'string',
              description: 'The password of the user (hashed)',
              minLength: 6,
              example: 'hashedpassword123',
            },
            passwordChangedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The time when the password was last changed',
              example: '2021-06-23T18:25:43.511Z',
            },
            passwordResetCode: {
              type: 'string',
              description: 'The password reset code',
              example: '123456',
            },
            passwordResetExpires: {
              type: 'string',
              format: 'date-time',
              description: 'The time when the password reset code expires',
              example: '2021-06-24T18:25:43.511Z',
            },
            passwordResetVerified: {
              type: 'boolean',
              description: 'Whether the password reset code has been verified',
              example: true,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The time when the user was created',
              example: '2024-08-21T12:00:00Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The time when the user was last updated',
              example: '2024-08-21T12:00:00Z',
            },
          },
          example: {
            id: '60d0fe4f5311236168a109ca',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            gender: 'male',
            birthday: '1990-01-01',
            location: 'New York, USA',
            phone: '+1234567890',
            problem: 'Difficulty in learning',
            role: 'admin',
            password: 'hashedpassword123',
            passwordChangedAt: '2021-06-23T18:25:43.511Z',
            passwordResetCode: '123456',
            passwordResetExpires: '2021-06-24T18:25:43.511Z',
            passwordResetVerified: true,
            createdAt: '2024-08-21T12:00:00Z',
            updatedAt: '2024-08-21T12:00:00Z',
          },
        },
        Kid: {
          type: 'object',
          required: ['firstName', 'lastName', 'parentId', 'gender'],
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the kid',
            },
            firstName: {
              type: 'string',
              description: 'The first name of the kid',
              example: 'Jane',
            },
            lastName: {
              type: 'string',
              description: 'The last name of the kid',
              example: 'Smith',
            },
            parentId: {
              type: 'string',
              description: 'The ID of the parent (User) associated with the kid',
              example: '60d0fe4f5311236168a109ca',
            },
            gender: {
              type: 'string',
              description: 'The gender of the kid',
              enum: ['male', 'female'],
              example: 'female',
            },
            age: {
              type: 'integer',
              description: 'The age of the kid',
              example: 10,
            },
            problem: {
              type: 'string',
              description: 'The problem or issue reported for the kid',
              example: 'Difficulty in concentrating',
            },
            status: {
              type: 'string',
              description: 'The status of the kid',
              enum: ['active', 'banned'],
              example: 'active',
            },
            role: {
              type: 'string',
              description: 'The role of the kid',
              enum: ['kid'],
              example: 'kid',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The time when the kid was created',
              example: '2024-08-21T12:00:00Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The time when the kid was last updated',
              example: '2024-08-21T12:00:00Z',
            },
          },
          example: {
            id: '60d0fe4f5311236168a109ca',
            firstName: 'Jane',
            lastName: 'Smith',
            parentId: '60d0fe4f5311236168a109ca',
            gender: 'female',
            age: 10,
            problem: 'Difficulty in concentrating',
            status: 'active',
            role: 'kid',
            createdAt: '2024-08-21T12:00:00Z',
            updatedAt: '2024-08-21T12:00:00Z',
          },
        },
        Session: {
          type: 'object',
          required: ['kidId'],
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the session',
            },
            kidId: {
              type: 'string',
              description: 'The ID of the kid associated with the session',
              example: '60d0fe4f5311236168a109ca',
            },
            problem: {
              type: 'string',
              description: 'The problem or issue discussed in the session',
              example: 'Difficulty in concentrating',
            },
            sessionDate: {
              type: 'string',
              format: 'date',
              description: 'The date when the session took place',
              example: '2024-09-01',
            },
            status: {
              type: 'string',
              description: 'The status of the session',
              enum: ['pending', 'accepted', 'rejected'],
              example: 'accepted',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The time when the session was created',
              example: '2024-08-21T12:00:00Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The time when the session was last updated',
              example: '2024-08-21T12:00:00Z',
            },
          },
          example: {
            id: '60d0fe4f5311236168a109ca',
            kidId: '60d0fe4f5311236168a109ca',
            problem: 'Difficulty in concentrating',
            sessionDate: '2024-09-01',
            status: 'accepted',
            createdAt: '2024-08-21T12:00:00Z',
            updatedAt: '2024-08-21T12:00:00Z',
          },
        },
      },
    },
    servers: [
      {
        url: 'http://localhost:8000',
      },
    ],
  },
  apis: ['./routes/*.js'], // files containing annotations as above
};

const specs = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  specs,
};