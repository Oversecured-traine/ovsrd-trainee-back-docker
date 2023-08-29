const express = require('express');
const uploadController = require('../controllers/getUrlController');

const router = express.Router();

router.post('/get-signed-url', uploadController.uploadImage);


module.exports = router;
