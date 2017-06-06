var mongoose = require('mongoose');
var config = require('./dbconfig.js');
mongoose.Promise = Promise;  
var db = mongoose.connect(config.dburl);
module.exports = {
    db: db
    , mongoose: mongoose
};