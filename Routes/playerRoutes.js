var express = require('express');
var Player = require('../models/playerModel');

var routes = function () {
    var playerController = require('../controllers/playerController.js')(Player);
    var hockeyRouter = express.Router();

    hockeyRouter.use('/:playerId', function (req, res, next) {
        Player.findById(req.params.playerId, function (err, player) {
            if (err)
                res.status(500).send(err);
            else if (player) {
                req.player = player;
                next();
            }
            else {
                res.status(404).send("player not found");
            }
        });
    })

    hockeyRouter.route('/')
        .post(playerController.post)
        .get(playerController.get);

    hockeyRouter.route('/:playerId')
        .get(playerController.getById)
        .put(playerController.putById)
        .patch(playerController.patchById)
        .delete(playerController.deleteById);

    return hockeyRouter;
};

module.exports = routes;
