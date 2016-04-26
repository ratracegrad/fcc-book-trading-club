process.env.NODE_ENV = 'test';

var app = require('../app.js');
var request = require('supertest')(app);
var should = require('should');



describe('Test of API routes', function() {

    it('should display homepage on call to /', function(done) {
        request
                .get('/')
                .expect('Content-Type', /text\/html/)
                .expect(200, done);
    });



    it('should display 404 for an invalid url request', function(done) {
        request
                .get('/foo/bar')
                .expect(404, done);
    });


    it('should redirect to / since not logged in', function(done) {
        request
                .get('/allbooks')
                .expect(302)
                .end(function(err, res) {
                    res.redirect.should.equal(true)
                    done();
                });
    });

});