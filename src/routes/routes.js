const express = require('express');
const getImageURL = require('../controllers/getImageURL');
const rootController = require('../controllers/rootController');
const uploadImageURL = require('../controllers/uploadImageURL');

const router = express.Router();

router.get('/', rootController.root);
router.get('/get-image-url', getImageURL.getSignedUrl);
router.get('/get-upload-image-url', uploadImageURL.getUploadImageURL);


module.exports = router;
