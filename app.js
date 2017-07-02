var express = require('express')
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

//Database Connection
var hockeyDb;

if(process.env.ENV == 'Test')
    hockeyDb = mongoose.connect('mongodb://127.0.0.1:27017/hockey_test');
else
    hockeyDb = mongoose.connect('mongodb://127.0.0.1:27017/hockey')

//server stuff
var app = express();
var port = process.env.port || 4000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

//Test api route
 app.get('/', function(request, response){
     response.send('welcome to my API, so glad you visited');
 });

//Routes
hockeyRouter = require('./Routes/playerRoutes')();
app.use('/api/players', hockeyRouter);
//app.use('/api/positions', positionRouter);


app.listen(port, function(){
    console.log('node is running gulp is Running on port ' + port);
});

module.exports = app;


/*
    var db = mongoose.connect('mongodb://127.0.0.1:27017/bookAPI');
    var Book = require('./models/bookModel');
    var Blog = require('./models/blogModel');

    var bookRouter = express.Router();
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
    app.use('/api', bookRouter);
*/


//Connection Tests
/*
 hockeyDb.connection.on('connection', function(){
 console.log("server connected to db");
 });
 hockeyDB.connection.on('error', function(error){
 console.log(error);
 });
 */