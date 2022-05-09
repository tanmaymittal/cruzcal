const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const OpenApiValidator = require('express-openapi-validator');
const passport = require('passport');

const routes = require('./routes');
const auth = require('./auth');

// Initialize app

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Passport session setup

app.use(passport.initialize());
app.use(passport.session());

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Setup API validation

const apiSpec = path.join(__dirname, '../api/openapi.yaml');
// const api = require(apiSpec);
const api = yaml.load(fs.readFileSync(apiSpec, 'utf8'));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(api));
app.use(
  OpenApiValidator.middleware({
    apiSpec: api,
    validateRequests: true,
    validateResponses: true,
  }),
);

// Routes

// app.get('/', (req, res) => res.sendStatus(200));
app.get('/api', (req, res) => res.sendStatus(200));
app.get('/api/auth/google', passport.authenticate(auth.googleStrategy));
app.get('/api/auth/google/redirect',
  passport.authenticate(auth.googleStrategy, {
    failureRedirect: '/api/auth/google',
    failureMessage: true,
  }),
  (req, res) => res.redirect('/'), // send(req.user)
);
app.get('/api/user', auth.check, auth.getUser);
app.post('/api/logout', auth.logOut);
app.get('/api/terms', routes.getTerms);
app.get('/api/subjects', routes.getSubjects); // e.g. /subjects?term=2222
app.get('/api/courses', routes.getCourses); // e.g. /courses?term=2222&subject=CSE
app.post('/api/schedule', routes.genSchedule);
app.post('/api/calendar', routes.genCalendar);

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
