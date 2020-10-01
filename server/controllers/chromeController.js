const { google } = require("googleapis");

const chromeController = {};

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

// =================================== //

chromeController.getAuthURL = (req, res, next) => {

  // Asks permissions for these things:
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  // the link that we use to redirect to the consent page
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    response_type: "code",
    prompt: "consent",
  });

  res.locals.url = url;
  return next();
};

// =================================== //

chromeController.getAuthCode = async (req, res, next) => {
  const { tokens } = await oauth2Client.getToken(req.query.code); // Tokens contains access_token, refresh_token, scope, id-token
  oauth2Client.setCredentials(tokens); // Verify credentials with google
  
  res.locals.token = tokens.id_token; // Store the id token for setting the cookie
  res.locals.sessionid = tokens.id_token; // store the access token in browser (just a string, doesn't embed valuable information)

  return next();
};


// =================================== //

module.exports = chromeController;