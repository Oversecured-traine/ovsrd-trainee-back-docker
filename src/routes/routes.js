const express = require('express');
const getImageURL = require('../controllers/getImageURL');
const rootController = require('../controllers/rootController');
const uploadImageURL = require('../controllers/uploadImageURL');
const deleteImageURL = require('../controllers/deleteImageURL');


const router = express.Router();

router.get('/', rootController.root);
router.post('/get-image-url', getImageURL.getSignedUrl);
router.post('/get-upload-image-url', uploadImageURL.getUploadImageURL);
router.post('/get-delete-image-url', deleteImageURL.deleteSignedUrl);


module.exports = router;
