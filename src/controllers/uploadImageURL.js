const s3 = require('../common/S3');
const logger = require('../utils/logger');

exports.getUploadImageURL = async (req, res) => {
    logger.info(req.body);
    logger.info(req.body.cardID);

    try {
        const cardID = req.body.cardID;

        const params = {
            Bucket: process.env.BUCKET_NAME || 'bucketdockerkryvoboktest',
            Key: `cards/test/${cardID}/`,
            Expires: 3600,
        };

        const signedUrl = await s3.getSignedUrl('putObject', params);

        res.json({ signedUrl });
    }
    catch(error) {
        logger.error('Error uploading file:', error);
        res.status(500).json({ error: 'Error uploading file' });
    }

};