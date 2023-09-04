const { deleteSignedUrl } = require('../../controllers/deleteImageURL'); // Подключаем функцию для тестирования
const sinon = require('sinon');
const s3 = require('../../common/S3');
const { describe, it } = require('mocha');

describe('deleteSignedUrl function', () => {
    it('should return a signed URL when cardID is provided', async () => {
        const req = {
            body: {
                cardID: '123',
            },
        };
        const res = {
            json: sinon.spy(),
            status: sinon.spy(),
        };

        sinon.stub(s3, 'getSignedUrl').resolves('mockedSignedUrl');

        process.env.DOCKER_BUCKET_NAME = 'bucketdockerkryvobokdev';

        await deleteSignedUrl(req, res);

        sinon.assert.calledWithExactly(s3.getSignedUrl, 'deleteObject', sinon.match.object);
        sinon.assert.calledWithExactly(res.json, { signedUrl: 'mockedSignedUrl' });
        sinon.assert.notCalled(res.status);

        sinon.restore();
    });

    it('should return a 500 status if an error occurs', async () => {
        const req = {
            body: {
                cardID: '123',
            },
        };
        const res = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis(),
        };
    
        sinon.stub(s3, 'getSignedUrl').rejects(new Error('Mocked error'));
    
        process.env.DOCKER_BUCKET_NAME = 'bucketdockerkryvobokdev';
    
        await deleteSignedUrl(req, res);
    
        sinon.assert.calledWithExactly(s3.getSignedUrl, 'deleteObject', sinon.match.object);
        sinon.assert.calledWithExactly(res.status, 500);
        sinon.assert.calledWithExactly(res.json, { error: 'Error deleting file' });
    
        sinon.restore();
    });
    
    
});
