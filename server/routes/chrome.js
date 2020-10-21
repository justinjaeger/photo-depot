const express = require("express");
const router = express.Router();
const chromeController = require('../controllers/chromeController');
const userController = require('../controllers/userController');


// Checks if user exists or if we're creating them
router.get('/login/:token',
  chromeController.doesUserExist, // do they already exist in db
  userController.createUser,
  (req, res) => {
  return res.json(res.locals.userinfo)
})

router.post('/images', 
  chromeController.addImage,
  (req, res) => {
  return res.json(res.locals.data);
})

module.exports = router;