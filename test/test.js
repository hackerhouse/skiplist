var request = require('supertest')
  , express = require('express');

var app = require('../app.js');

describe('GET', function() {
    it ('responds with a list of tiles in JSON', function(done) {
	request(app)
	    .get('/tiles')
	    .set('Accept', 'application/json')
	    .expect('Content-Type', /json/)
	    .expect(200, done);
    });
});

describe('GET', function() {
    it ('responds with a list of users in JSON', function(done) {
	request(app)
	    .get('/users')
	    .set('Accept', 'application/json')
	    .expect('Content-Type', /json/)
	    .expect(200, done);
    });
});

describe('GET', function() {
    it ('responds with the HTML homepage', function(done) {
	request(app)
	    .get('/')
	    .set('Accept', 'text/html')
	    .expect(200, done);
    });
});
