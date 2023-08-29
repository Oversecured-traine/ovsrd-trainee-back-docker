const AWS = require('aws-sdk');

const s3 = new AWS.S3();

exports.getSignedUrl = async (req, res) => {
    try {
        const cardID = req.body.cardID;
        const fileName = req.body.fileName;

        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `cards/${cardID}/${fileName}`,
            Expires: 3600,
            ACL: 'public-read',
        };

        const signedUrl = await s3.getSignedUrl('getObject', params);

        res.json({ signedUrl });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Error uploading file' });
    }
};
