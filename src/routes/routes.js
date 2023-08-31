const express = require('express');
const getImageURL = require('../controllers/getImageURL');
const rootController = require('../controllers/rootController');
const uploadImageURL = require('../controllers/uploadImageURL');

const router = express.Router();

router.get('/', rootController.root);
router.post('/get-image-url', getImageURL.getSignedUrl);
router.post('/get-upload-image-url', uploadImageURL.getUploadImageURL);


module.exports = router;
