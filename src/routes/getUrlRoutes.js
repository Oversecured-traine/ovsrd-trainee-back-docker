const express = require('express');
const getUrlController = require('../controllers/getUrlController');

const router = express.Router();

router.post('/get-signed-url', getUrlController.getSignedUrl);


module.exports = router;
