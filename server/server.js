require('dotenv').config()
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;

const path = require('path');

const userController = require("./controllers/userController")
const imageRouter = require("./routes/images");
const tagRouter = require("./routes/tags");
const apiRouter = require("./routes/api");

// JSON parser:
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());

// Webpack production
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  // statically serve everything in the dist folder on the route
  app.use('/dist', express.static(path.resolve(process.cwd(), './dist')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.resolve(process.cwd(), './client/src/index.html'));
  });
};

/*
  The userController.getUser middleware passes the userId 
  from the cookie into res.locals.userId
*/

// IMAGES ROUTER
app.use('/images', userController.getUser, imageRouter);

// API ROUTER
app.use('/api', apiRouter);

// TAGS ROUTER
app.use('/tags', userController.getUser, tagRouter);

// catch-all endpoint handler
app.use((req, res) => {
  return res.status(400).send('Page not found.')
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unkown middleware error!',
    status: 500,
    message: {
      err: 'An error occurred!'
    }
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
})

app.listen(PORT, () => {
  console.log('Listening on ' + PORT);
});

module.exports = app;
