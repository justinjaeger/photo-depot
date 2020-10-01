const express = require("express");
const router = express.Router();
const chromeController = require('../controllers/chromeController');

router.get('/login', 
  // chromeController.getImages, 
  (req, res) => {
  return res.status(200).json(res.locals.data);
})

router.get('/logout', 
  // chromeController.getImages, 
  (req, res) => {
  return res.status(200).json(res.locals.data);
})

module.exports = router;
