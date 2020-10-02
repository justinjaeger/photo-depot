const db = require('../models/model');
const queries = require('../utils/queries');
const jwtDecode = require('jwt-decode');

const chromeController = {};

// =================================== //

chromeController.doesUserExist = (req, res, next) => {

  const { name, sub } = jwtDecode(req.params.token);

  db.query(queries.getUserByUserid, [sub])
    .then(data => {
      if (data.rows[0]) {
        console.log('User does exist already:', data.rows[0])
        return res.json([name, sub]); // if they exist then send back the name
      } else {
        res.locals.token = req.params.token; // important for next middleware
        return next(); // if not we create them
      }
    })
    .catch(err => {
      console.log('Error seeing if user exists in userController.doesUserExist')
      return next(err);
    })
};

// =================================== //

chromeController.addImage = (req, res, next) => {

  console.log('REQ BODY', req.body)

  const { imageUrl, userId } = req.body;

  // define new date/time
  const now = new Date();
  const date = `${now.toDateString()}-${now.toTimeString().split(' ')[0]}`;

  //default rating of 0
  const rating = 0;

  db.query(queries.addImage, [imageUrl, userId, date, rating])
    .then(data => {
      const { photoid } = data.rows[0];
      res.locals.data = data.rows[0];
      res.locals.websocket = {
        userId,
        imageUrl,
        date,
        photoid,
        rating,
        tags: []
      }
      console.log('this is res locals data: ', res.locals.data)
      return next();
    })
    .catch(err => {
      return next({
        log: `Error occurred with queries.addImage: ${err}`,
        message: {
          err: 'An error occured with SQL when saving an image.'
        },
      });
    })
};

// =================================== //

module.exports = chromeController;