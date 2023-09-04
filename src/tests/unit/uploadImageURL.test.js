const { getUploadImageURL } = require('../../controllers/uploadImageURL');
const sinon = require('sinon');
const s3 = require('../../common/S3');
const { describe, it } = require('mocha');

describe('getUploadImageURL function', () => {
    it('should return a signed URL when cardID and fileType are provided', async () => {
        const req = {
            body: {
                cardID: '123',
                fileType: 'image/jpeg',
            },
        };
        const res = {
            json: sinon.spy(),
            status: sinon.spy(),
        };

        sinon.stub(s3, 'getSignedUrl').resolves('mockedSignedUrl');

        process.env.DOCKER_BUCKET_NAME = 'TestBucket';

        await getUploadImageURL(req, res);

        sinon.assert.calledWithExactly(s3.getSignedUrl, 'putObject', sinon.match({
            Bucket: process.env.DOCKER_BUCKET_NAME,
            Key: 'cards/123',
            Expires: 86400,
            ContentType: 'image/jpeg',
        }));
        sinon.assert.calledWithExactly(res.json, { signedUrl: 'mockedSignedUrl' });
        sinon.assert.notCalled(res.status);

        sinon.restore();
    });

    it('should return a 500 status if an error occurs', async () => {
        const req = {
            body: {
                cardID: '123',
                fileType: 'image/jpeg',
            },
        };
        const res = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis(),
        };
    
        sinon.stub(s3, 'getSignedUrl').rejects(new Error('Mocked error'));
    
        process.env.DOCKER_BUCKET_NAME = 'TestBucket';
    
        await getUploadImageURL(req, res);
    
        sinon.assert.calledWithExactly(s3.getSignedUrl, 'putObject', sinon.match.object);
        sinon.assert.calledWithExactly(res.status, 500);
        sinon.assert.calledWithExactly(res.json, { error: 'Error uploading file' });
    
        sinon.restore();
    });
});
