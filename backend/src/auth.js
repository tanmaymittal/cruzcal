// const {getAllTerms, getTermByCode, getCourseByID} = require('./db');
const GoogleStrategy = require('passport-google-oidc');

exports.googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/redirect',
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
    console.log(profile);
    if (ucscError) {
      cb('Authentication Error: User does not have a ucsc email');
    } else cb(null, profile);
  });

exports.check = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/api/auth/google');
};

exports.logOut = async (req, res) => {
  req.logout();
  res.redirect('/');
};
