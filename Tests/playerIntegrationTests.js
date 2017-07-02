var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Player = require('../models/playerModel'),
    agent = request.agent(app);

describe('Player CRUD test ', function () {
    it('should allow a book to be posted and return a _id', function (done) {
        var playerPost = {name: 'John Doe', position: 'anyPosition', age: 30};

        agent.post('/api/players')
            .send(playerPost)
            .expect(200)
            .end(function(err, results){
                results.body.should.have.property('name');
                results.body.should.have.property('_id');
                done();
            })
    })

    afterEach(function(done){
        Player.remove().exec();
        done();
    })
})