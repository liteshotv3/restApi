var should = require('should'),
    sinon = require('sinon');
//mocha runs inside gulp-mocha, no need for reference

describe('Player Controller Tests', function () {
    describe('Post', function () {
        it('should not allow an empty name on post', function () {
            var Player = function(player){this.save = function(){}};

            var req = {
                body: {
                    position: 'hero'
                }
            };

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            var playerController = require('../controllers/playerController')(Player);

            playerController.post(req,res);
            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('name is required').should.equal(true);
        })
    })
});