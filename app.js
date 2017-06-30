var express = require('express')
    mongoose = require('mongoose'),
    mongodb = require("mongodb");;

// var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');

var hockeyDB = mongoose.connect('mongodb://127.0.0.1:27017/hockey');
// mongoose.connection.on('connection', function(){
//     console.log("server connected to db");
// });

// hockeyDB.connection.on('error', function(error){
//     console.log(error);
// });


var Player = require('./models/playerModel');

var app = express();

var port = process.env.port || 4000;

 app.get('/', function(request, response){
     response.send('welcome to my API, so glad you visited');
 });

// app.get("/api/hockey", function(req, res) {
//     hockeyDb.collection("players").find({}).toArray(function(err, docs) {
//         if (err) {
//             handleError(res, err.message, "Failed to get contacts.");
//         } else {
//             res.status(200).json(docs);
//         }
//     });
// });

var hockeyRouter = express.Router();

hockeyRouter.route('/Players')
    .get(function(req, res){
        // var responseJson = {hi: "This is my hockey player api"};
        // res.json(responseJson);
        Player.find(function(error, players){
            if(error)
                res.status(500).send(error);
            else
                res.json(players);
        })
    });

var bookRouter = express.Router();

bookRouter.route('/Books')
    .get(function(request, response){

        Book.find(function(err, books){
            if(err)
                //console.log(err);
                response.status(500).send(err);
            else{
                console.log("snap");
                response.json(books);
            }
        });
    });

app.use('/api', bookRouter, hockeyRouter);
//app.use('/api', hockeyRouter);

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

app.listen(port, function(){
    console.log('node is running gulp is Running on port ' + port);
});