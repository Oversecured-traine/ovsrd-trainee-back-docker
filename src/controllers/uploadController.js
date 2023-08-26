const sharp = require('sharp');
const mime = require('mime-types');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();

exports.uploadImage = async (req, res) => {
    try {
        const file = req.file;
        const cardID = req.body.cardID;

        const fileType = mime.lookup(file.originalname);
        if (!fileType.startsWith('image/')) {
            return res.status(400).json({ error: 'Only image files are allowed.' });
        }

        const processedImageBuffer = await sharp(file.buffer)
            .resize(400, 400)
            .toBuffer();

        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `cards/${cardID}/${file.originalname}`,
            Body: processedImageBuffer,
            ACL: 'public-read',
        };

        const data = await s3.upload(params).promise();
        const fileUrl = data.Location;

        res.json({ fileUrl });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Error uploading file' });
    }
};
