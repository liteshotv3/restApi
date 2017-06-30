var express = require('express')
    mongoose = require('mongoose');

//var db = mongoose.connect('mongodb://127.0.0.1:27017/bookAPI');
var hockeyDB = mongoose.connect('mongodb://127.0.0.1:27017/hockey');

var Book = require('./models/bookModel');
var Blog = require('./models/blogModel');

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

var hockeyRouter = express.Router();
var bookRouter = express.Router();

hockeyRouter.route('/players')
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

bookRouter.route('/books')
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

app.listen(port, function(){
    console.log('node is running gulp is Running on port ' + port);
});