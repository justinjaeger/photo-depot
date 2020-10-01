const cookieController = {};

// =================================== //

cookieController.doesCookieExist = (req, res, next) => {
  if (req.cookies.sessionid) { // if they have a cookie
    return res.json(true)
  } else {
    return next();
  };
};

// =================================== //

cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('sessionid', res.locals.sessionid, { httpOnly: true }); // set a cookie with the token ID
  return next();
};

// =================================== //

cookieController.removeCookie = (req, res, next) => {
  res.clearCookie('sessionid');
  return next();
};

// =================================== //

module.exports = cookieController;