const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {google} = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_AUTH_REDIRECT,
);
google.options({auth: oauth2Client});

exports.googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_AUTH_REDIRECT,
    state: true,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/calendar',
    ],
  },
  async function verify(token, refresh, profile, cb) {
    const user = {
      displayName: profile.displayName,
      creds: {token, refresh},
    };
    // console.log(JSON.stringify({token, refresh}));
    // fs.writeFile('tokens.json', JSON.stringify({token}), () => {});
    // oauth2Client.setCredentials({access_token: token});
    // const calendar = google.calendar({
    //   version: 'v3',
    //   auth: token,
    // });
    // try {
    //   const res = await calendar.calendarList.list();
    //   console.log(res?.data?.items?.length);
    // } catch (error) {
    //   console.log(error);
    // }
    // profile.email = profile.emails[0].value;
    cb(null, user);
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
