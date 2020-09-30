const db = require('../models/model');
const queries = require('../utils/queries');
const jwtDecode = require('jwt-decode');

const userController = {};

// =================================== //

userController.createUser = (req, res, next) => {

  // harvest all of the info we're going to store
  const { name, sub } = jwtDecode(res.locals.token); // sub is the unique google ID
  const userid = Number(sub);
  const sessionid = res.locals.sessionid;

  // write new user to database
  db.query(queries.createUser, [userid, name, sessionid])
    .then(data => {
      console.log('Success creating new user: ', data)
      return next();
    })
    .catch(err => {
      return next({
        log: `Error occurred with queries.createUser: ${err}`,
        message: { err: 'An error occured with SQL when creating user' },
      });
    })
};

userController.logoutUser = (req, res, next) => {

  db.query(queries.logoutUser, [userId])
  .then(data => {
    console.log('Successfully logged out user: ', data)
    return next();
  })
  .catch(err => {
    return next({
      log: `Error occurred with queries.logoutUser: ${err}`,
      message: { err: 'An error occured with SQL when logging out user' },
    });
  })
};

// =================================== //

module.exports = userController;