const express = require("express");
const router = express.Router();
const jwtDecode = require('jwt-decode');
// const chromeController = require('../controllers/chromeController');

router.get('/login/:token', 
  // chromeController.getImages, 
  (req, res) => {
  console.log('THIS IS FROM THE SERVER', req.params)
  const decoded = jwtDecode(req.params.token)
  return res.json(decoded)
  // return res.status(200).json(res.locals.data);
})

router.get('/logout', 
  // chromeController.getImages, 
  (req, res) => {
  return res.status(200).json(res.locals.data);
})

module.exports = router;