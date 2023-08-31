const s3 = require('../common/S3');
const logger = require('../utils/logger');

exports.getSignedUrl = async (req, res) => {
    logger.info(req.body);
    try {
        const cardID = req.body.cardID;
        const fileName = req.body.fileName;

        const params = {
            Bucket: process.env.BUCKET_NAME || 'bucketdockerkryvoboktest',
            Key: `cards/${cardID}/${fileName}`,
            Expires: 3600,
        };

        const signedUrl = await s3.getSignedUrl('getObject', params);

        res.json({ signedUrl });
    } catch (error) {
        logger.error('Error uploading file:', error);
        res.status(500).json({ error: 'Error uploading file' });
    }
};
