var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var playerModel = new Schema({
    name: {type: String},
    age: {type: Number},
    height: {type: String},
    weight: {type: Number},
    position: {type: String},
    number: {type: Number},
    birthplace: {type: String}
});

module.exports = mongoose.model('player', playerModel);