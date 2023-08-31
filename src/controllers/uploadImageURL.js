const s3 = require('../common/S3');
const logger = require('../utils/logger');

exports.getUploadImageURL = async (req, res) => {
    logger.info(req.body);
    logger.info(req.body.data);
    logger.info(req.body.data.cardID);
    logger.info(req.body.data.fileName);
    logger.info(req.body.data.fileType);



    try {
        const cardID =  req.body.data.cardID;
        const fileName = req.body.data.fileName;
        const fileType = req.body.data.fileType;

        const params = {
            Bucket: process.env.BUCKET_NAME || 'bucketdockerkryvoboktest',
            Key: `cards/test/${cardID}/${fileName}`,
            Expires: 86400, // на сутки
            ContentType: fileType,

        };

        const signedUrl = await s3.getSignedUrl('putObject', params);

        res.json({ signedUrl });
    }
    catch(error) {
        logger.error('Error uploading file:', error);
        res.status(500).json({ error: 'Error uploading file' });
    }

};