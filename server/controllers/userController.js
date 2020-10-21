const db = require('../models/model');
const queries = require('../utils/queries');
const jwtDecode = require('jwt-decode');

const userController = {};

// =================================== //

userController.createUser = (req, res, next) => {

  console.log('CREATING USER!!!!!!!')

  // harvest all of the info we're going to store
  const { name, sub } = jwtDecode(res.locals.token); // sub is the unique google ID

  // write new user to database
  db.query(queries.createUser, [sub, name])
    .then(data => {
      console.log('Success creating new user')
      res.locals.userinfo = [name, sub];
      return next();
    })
    .catch(err => {
      return next({
        log: `Error occurred with queries.createUser: ${err}`,
        message: { err: 'An error occured with SQL when creating user' },
      });
    })
};

// =================================== //

// if user DOES NOT exist, then we move on
userController.isCookieValidUser = (req, res, next) => {

  const { sub } = jwtDecode(res.locals.token);

  db.query(queries.validateUser, [sub])
    .then(data => {
      console.log('Data from validation: ', data)
      return res.send(true);
    })
    .catch(err => { // means the user doesn't exist
      console.log('User does not exist ', err)
      return next();
    })
};

// =================================== //

userController.doesUserExist = (req, res, next) => {

  console.log('checking if user exists')

  const { sub } = jwtDecode(res.locals.token);

  db.query(queries.getUserByUserid, [sub])
    .then(data => {
      if (data.rows[0]) {
        return res.redirect('http://localhost:3000/'); // if they exist then you go right to home page
      } else {
        return next(); // if they don't exist move on and create them
      }
    })
    .catch(err => {
      console.log('Error seeing if user exists in userController.doesUserExist')
      return next(err);
    })
};

// =================================== //

userController.getUser = (req, res, next) => {

  console.log('getting user')

  const { sub } = jwtDecode(req.cookies.sessionid);

  db.query(queries.getUserByUserid, [sub])
    .then(data => {
      console.log('returned user:', data.rows[0])
      res.locals.userId = data.rows[0].userid; // save the userId in data
      return next(); // keep going
    })
    .catch(err => {
      console.log(err, 'Cannot find User in getUser...')
      return next(err);
    })
};

// =================================== //

module.exports = userController;