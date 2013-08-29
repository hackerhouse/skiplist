var mongoose = require('mongoose');

var tileSchema = new mongoose.Schema({
    pageTitle: String,
    pageURL: String,
    uid: String,
    created: {type: Date, 'default': Date.now},
});

mongoose.model('tiles', tileSchema);