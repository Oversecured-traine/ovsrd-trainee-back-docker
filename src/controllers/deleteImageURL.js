const s3 = require('../common/S3');
const logger = require('../utils/logger');

exports.deleteSignedUrl = async (req, res) => {
    logger.info(req.body);
    logger.info('process.env.DOCKER_BUCKET_NAME', process.env.DOCKER_BUCKET_NAME);

    try {
        const cardID = req.body.cardID;

        const params = {
            Bucket: process.env.DOCKER_BUCKET_NAME,
            Key: `cards/${cardID}`,
            Expires: 86400, // на сутки
        };

        const signedUrl = await s3.getSignedUrl('deleteObject', params);

        res.json({ signedUrl });
    } catch (error) {
        logger.error('Error deleting file:', error);
        res.status(500).json({ error: 'Error deleting file' });
    }
};
