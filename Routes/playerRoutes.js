var express = require('express');
var Player = require('../models/playerModel');

var routes = function(){
    var hockeyRouter = express.Router();

    hockeyRouter.route('/')
        .post(function(req, res){
            var player = new Player(req.body);
            player.save();
            res.status(201).send(player);
        })
        .get(function(req, res){
            // var responseJson = {hi: "This is my hockey player api"};
            // res.json(responseJson);
            var query = {};
            if(req.query.position)
            {
                query.position =req.query.position;
            }
            Player.find(query, function(error, players){
                if(error)
                    res.status(500).send(error);
                else
                    res.json(players);
            })
        });

    hockeyRouter.route('/:playerId')
        .get(function(req, res){
            Player.findById(req.params.playerId, function(err,player){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(player)
            })
        });
    return hockeyRouter;
};

module.exports = routes;