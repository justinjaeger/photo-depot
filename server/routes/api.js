const express = require("express");
const router = express.Router();
const oauthController = require("../controllers/oauthController");
const userController = require("../controllers/userController");
const cookieController = require("../controllers/cookieController");

/*
  Request comes from Login container

  This route asks for permissions from a user to retrieve an access token
  1. /getAuthURL
    - This harvests a URL which we then use to redirect the user to a consent page
  2. User will then give permission on consent page
  3. Google then redirects the user to the redirect URL that we provided ** see process.env.REDIRECT_URL
    - This will contain a code query parameter ** /oauthcallback?code={authorizationCode}
  4. /login/google
    - This is where we currently have the redirect routed
    - Harvests the access token and uses a command to set the credentials
    - At this point, you are logged in
*/

router.get('/getAuthURL',
  oauthController.getAuthURL, 
  (req, res) => {
  return res.redirect(res.locals.url);
});

// automatically goes here after you log into google
router.get('/login/google', 
  oauthController.getAuthCode, // get access token
  cookieController.setSSIDCookie, // set a cookie in browser
  userController.doesUserExist, // do they already exist in db
  userController.createUser, // create a user with this information
  (req, res) => {
  return res.redirect('http://localhost:3000/');
});

// This route isn't from a button, it automatically checks these things
router.get('/login',
  cookieController.doesCookieExist,
  userController.isCookieValidUser,
  (req, res) => {
  return res.json(false);
})

router.use('/logout', 
  // userController.logoutUser,
  cookieController.removeCookie, 
  (req, res) => {
  return res.redirect('/');
});

module.exports = router;