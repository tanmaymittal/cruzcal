// const {getAllTerms, getTermByCode, getCourseByID} = require('./db');
const GoogleStrategy = require('passport-google-oidc');

exports.googleStrategy = new GoogleStrategy(
  {
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenURL: 'https://www.googleapis.com/oauth2/v4/token',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4200/api/auth/google/redirect',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/calendar',
    ],
  },
  function verify(issuer, profile, cb) {
    const {emails} = profile;
    const ucscEmails = emails.filter((e) => e.value.endsWith('ucsc.edu'));
    const ucscError = ucscEmails.length === 0;
    console.log(`Attends UCSC? ${!ucscError}`);
    profile.email = profile.emails[0].value;
    // if (ucscError) {
    //   cb('Authentication Error: User does not have a ucsc email');
    // } else cb(null, profile);
    cb(null, profile);
  });

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
