const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const OpenApiValidator = require('express-openapi-validator');

const routes = require('./routes');

// Initialize app

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Setup API validation

const api = require('../api/openapi.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(api));
app.use(
  OpenApiValidator.middleware({
    apiSpec: api,
    validateRequests: true,
    validateResponses: true
  }),
);

// Routes

// app.get('/terms', routes.getTerms);
// app.post('/schedule', routes.genSchedule);
// app.post('/calendar', routes.genCalendar);

module.exports = app;
