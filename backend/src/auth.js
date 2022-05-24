const GoogleStrategy = require('passport-google-oauth20').Strategy;

const googleStrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_AUTH_REDIRECT,
  state: true,
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/calendar',
  ],
};

process.env.GOOGLE_CALENDAR_REDIRECT = '/api/auth/google/calendar/redirect';
exports.googleCalendarStrategy = new GoogleStrategy(
  {
    ...googleStrategyOptions,
    callbackURL: process.env.GOOGLE_CALENDAR_REDIRECT,
  },
  async (token, refresh, profile, cb) => {
    const user = {
      creds: {token, refresh},
    };
    cb(null, user);
  },
);

exports.googleStrategy = new GoogleStrategy(
  googleStrategyOptions,
  async (token, refresh, profile, cb) => {
    const user = {
      displayName: profile.displayName,
      creds: {token, refresh},
      account: profile,
    };
    cb(null, user);
  },
);

exports.loggedIn = async (req, res, next) => {
  if (req.isAuthenticated() && req.user?.account) next();
  else res.sendStatus(401);
};

exports.check = async (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.sendStatus(401);
};

exports.getUser = async (req, res) => {
  res.json(req.user);
};

exports.logOut = async (req, res) => {
  req.logout();
  res.redirect('/');
};
