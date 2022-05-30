const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const OpenApiValidator = require('express-openapi-validator');
const passport = require('passport');

const routes = require('./routes');
const auth = require('./auth');

// Initialize app

const app = express();
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
  return done(null, user);
});

// Setup API validation

// const api = require(apiSpec);
const apiSpec = path.join(__dirname, '../api/openapi.yaml');
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

process.env.API_VERSION = 0.2;
app.get('/api/version/latest',
  (_, res) => res.type('text/plain').send(process.env.API_VERSION));

// Authentication
app.get('/api/auth/check', auth.check, (_, res) => res.sendStatus(200));
app.get('/api/auth/google', passport.authenticate(auth.googleStrategy));
app.get('/api/auth/google/redirect',
  passport.authenticate(auth.googleStrategy, {
    successRedirect: '/',
    failureRedirect: '/api/auth/google',
    failureMessage: true,
  }),
);
app.get('/api/auth/google/calendar',
  passport.authenticate(auth.googleCalendarStrategy));
app.get('/api/auth/google/calendar/redirect',
  passport.authenticate(auth.googleCalendarStrategy, {
    successRedirect: '/api/loading',
    failureRedirect: '/api/auth/google/calendar',
    failureMessage: true,
  }),
);
app.get('/api/loading', (req, res) => res.send('Loading...'));

// User management
app.get('/api/user', auth.loggedIn, auth.getUser);
app.post('/api/logout', auth.logOut);

// Course selection
app.get('/api/terms', routes.getTerms);
app.get('/api/subjects', routes.getSubjects);
app.get('/api/courses', routes.getCourses);

// Schedule generation
app.post('/api/schedule/:type', routes.genSchedule);
app.get('/api/calendar/*', routes.verifySchedule);
app.get('/api/calendar/json', routes.genJSON);
app.get('/api/calendar/ics', routes.genICS);
app.get('/api/calendar/google', auth.check, routes.genGoogleCalendar);

// Error handler
app.use((err, req, res, next) => {
  console.log(err);
  const error = {
    status: err.status || 500,
    message: err.message,
    errors: err.errors,
  };
  res.status(error.status).send(error);
});

module.exports = app;
// http://localhost:4200/api/calendar/google?termCode=2222&courseIDs=50005
