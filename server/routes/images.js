const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const imageController = require('../controllers/imageController');
const cookieController = require('../controllers/cookieController');
=======
const imageController = require('../controllers/imageController')
const websocketController = require('../controllers/websocketController')
>>>>>>> master

router.get('/', imageController.getImages, (req, res) => {
  return res.status(200).json(res.locals.data);
})

router.post('/', imageController.addImage, websocketController.sendImage, (req, res) => {
  return res.status(200).json(res.locals.data);
})

router.put('/:photoid', imageController.updateImage, (req, res) => {
  return res.status(200).json({});
})

router.delete('/:photoid', imageController.deleteImage, (req, res) => {
  return res.status(200).json({});
})

module.exports = router;
