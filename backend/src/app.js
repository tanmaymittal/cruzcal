const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const OpenApiValidator = require('express-openapi-validator');

const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

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
app.post('/schedule', routes.genSchedule);
app.post('/calendar', routes.genCalendar);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;
