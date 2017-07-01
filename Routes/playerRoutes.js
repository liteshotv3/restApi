var express = require('express');
var Player = require('../models/playerModel');

var routes = function () {
    var hockeyRouter = express.Router();
    var playerController = require('../controllers/playerController.js')(Player);

    hockeyRouter.route('/')
        .post(playerController.post)
        .get(playerController.get);

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

    hockeyRouter.route('/:playerId')
        .get(function (req, res) {
            res.json(req.player);
        })
        .put(function (req, res) {
            req.player.position = req.body.position;
            req.player.id = req.body.id;
            req.player.weight = req.body.weight;
            req.player.height = req.body.weight;
            req.player.imageUrl = req.body.imageUrl;
            req.player.birthplace = req.body.birthplace;
            req.player.age = req.body.age;
            req.player.name = req.body.name;
            req.player.birthdate = req.body.birthdate;
            req.player.number = req.body.number;
            req.player.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.player);
                }
            });
        })
        .patch(function (req, res) {
            if (req.body._id)
                delete req.body._id;
            for (var i in req.body) {
                req.player[i] = req.body[i];
            }
            req.player.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.player);
                }
            });
        })
        .delete(function (req, res) {
            req.player.remove(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.status(204).send('Removed');
                }
            });
        });
    return hockeyRouter;
};

module.exports = routes;
