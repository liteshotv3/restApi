var express = require('express'),
    mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/kittens', {useMongoClient: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("Connected to the kitten server")

    var kittySchema = mongoose.Schema({
        name: String
    });

    kittySchema.methods.speak = function() {
        var greeting = this.name
            ? "Meow name is " + this.name
            : "I don't have a name";
        console.log(greeting);
    }

    var Kitten = mongoose.model('Kitten', kittySchema);

    var smudge = new Kitten({ name: 'Smudge' });
    console.log(smudge.name);

    var rex = new Kitten({ name: 'Rex' });
    rex.speak();

    rex.save(function (err, rex) {
        if (err) return console.error(err);
        //rex.speak();
    });
    smudge.save(function (err, smudge) {
        if (err) return console.error(err);
        smudge.speak();
    });

    Kitten.find(function(err, kittens) {
        if(err)
            return console.error(err);
        console.log(kittens);
    })

    Kitten.find({ name: /^fluff/ }, callback);
});

var port = process.env.port || 4000;

app.get('/', function(request, response){
    response.send('Welcome to the kitten server');
});

app.listen(port, function(){
    console.log('node is running gulp is Running on port ' + port);
});