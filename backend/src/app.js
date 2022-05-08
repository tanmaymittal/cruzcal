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
    validateRequests: false,
    validateResponses: false,
  }),
);

// Routes

// app.get('/', (req, res) => res.sendStatus(200));
app.get('/api', (req, res) => res.sendStatus(200));
app.get('/api/auth/google', passport.authenticate(auth.googleStrategy));
app.get('/api/auth/google/redirect',
  passport.authenticate(auth.googleStrategy, {
    successRedirect: '/',
    failureRedirect: '/api/auth/google',
  }),
  (req, res) => res.send(req.user),
);
app.get('/api/user', auth.check, auth.getUser);
app.post('/api/logout', auth.logOut);
app.get('/api/terms', routes.getTerms);
app.post('/api/schedule', routes.genSchedule);
app.post('/api/calendar', routes.genCalendar);

module.exports = app;
