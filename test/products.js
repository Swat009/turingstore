var supertest = require('supertest');
var server = supertest.agent("http://localhost:8000");;

//==================== Products API test ====================

/**
 * Testing Products API endpoints
 */

describe('GET /products', function () {
    it('respond with json containing a list of all products', function (done) {
        server
        .get('/products')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});