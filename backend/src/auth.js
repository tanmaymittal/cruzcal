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
    process.nextTick(function() {
      console.log(token);
      console.log(profile);
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
