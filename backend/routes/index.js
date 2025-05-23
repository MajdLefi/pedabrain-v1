const authRoute = require('./authRoute');
//const adminRoute = require('./admin');
const userRoute = require('./user');
const kidRoute = require('./kid');
const sessionRoute = require('./session');
const { swaggerUi, specs } = require('./../utils/swagger');
const path = require('path');
const express = require('express')

const mountRoutes = (app) => {
  //app.use('/api/v0/admin', adminRoute);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  app.use('/api/v0/auth', authRoute);
  app.use('/api/v0/users', userRoute);
  app.use('/api/v0/kids', kidRoute);
  app.use('/api/v0/sessions', sessionRoute);
  //app.use('/uploads/invoices', express.static(path.join(__dirname, 'uploads/invoices')));
};

module.exports = mountRoutes;