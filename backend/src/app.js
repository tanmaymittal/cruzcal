const express = require('express');
const session = require('express-session');
const path = require('path');
// const cors = require('cors');
const fs = require('fs');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const OpenApiValidator = require('express-openapi-validator');
const passport = require('passport');

const routes = require('./routes');
const auth = require('./auth');

// Initialize app

const app = express();
// app.use(cors());
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
  process.nextTick(function() {
    done(null, user);
  });
});

// used to deserialize the user
passport.deserializeUser(function(user, done) {
  process.nextTick(function() {
    return done(null, user);
  });
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

// Authentication
app.get('/api/auth/google', passport.authenticate(auth.googleStrategy));
app.get('/api/auth/google/redirect',
  passport.authenticate(auth.googleStrategy, {
    successRedirect: '/',
    failureRedirect: '/api/auth/google',
    failureMessage: true,
  }),
);

// User management
app.get('/api/user', auth.check, auth.getUser);
app.post('/api/logout', auth.logOut);

// Course selection
app.get('/api/terms', routes.getTerms);
app.get('/api/subjects', routes.getSubjects);
app.get('/api/courses', routes.getCourses);

// Schedule generation
app.post('/api/schedule/:type', routes.genSchedule);
app.get('/api/calendar/*', routes.verifySchedule);
app.get('/api/calendar/json', (req, res) => res.json(req.body));
app.get('/api/calendar/ics', routes.genCalendar);
// app.get('/api/calendar/google', auth.check, routes.genGoogleCalendar);

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
