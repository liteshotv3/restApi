var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title: String,
    author: String,
    body: String,
    comments: [{ body: String,
                 date: Date.now}],
    hidden: Boolean,
    meta: {
        votes: Number,
        favs:  Number
    }
});

var Blog = mongoose.model('Blog', blogSchema);

module.exports  = Blog;