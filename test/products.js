const request = require('supertest');
const app = require('../app');

//==================== Products API test ====================

/**
 * Testing Products API endpoints
 */

describe('GET /products', function () {
    it('respond with json containing a list of all products', function (done) {
        request(app)
            .get('/products')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});