const assert = require('assert');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

describe('Unit testing the /login route', function() {
    it('Should return OK status', function() {
        return request(app)
        .get('/login')
        .then(function(response) {
            assert.equal(response.status, 200);
        })
    });
    it('Should return message on rendering', function() {
        return request(app)
        .get('/login')
        .then(function(response) {
            expect(response.text).to.contain('Login');
        })
    })
})