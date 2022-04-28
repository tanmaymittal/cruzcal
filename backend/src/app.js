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
    validateResponses: true,
  }),
);

// Routes

app.get('/terms', routes.getTerms);
app.get('/subjects', routes.getSubjects); // e.g. /subjects?term=2222
app.get('/courses', routes.getCourses); // e.g. /courses?term=2222&subject=CSE
app.post('/schedule', routes.genSchedule);
app.post('/calendar', routes.genCalendar);

// Error handler
app.use((err, req, res, next) => {
  const error = {
    status: err.status || 500,
    message: err.message,
    errors: err.errors,
  };
  res.status(error.status).send(error);
});

module.exports = app;
