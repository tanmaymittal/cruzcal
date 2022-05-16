const GoogleStrategy = require('passport-google-oauth20').Strategy;

exports.googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/redirect',
    state: true,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/calendar',
    ],
  },
  function verify(token, refresh, profile, cb) {
    const user = {
      creds: {token, refresh},
    };
    // profile.creds = {token, refresh};

    console.log('token', token);
    cb(null, user);
  });

exports.check = async (req, res, next) => {
  console.log('req.isAuthenticated', req.isAuthenticated);
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
