var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var playerModel = new Schema(
    {
        position: {type: String},
        id: {type: Number},
        weight: {type: Number},
        height: {type: String},
        imageUrl: {type: String},
        birthplace: {type: String},
        age: {type: Number},
        name: {type: String},
        birthdate: {type: String},
        number: {type: Number}
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('player', playerModel);

