var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username : {type : String, unique : true},
    password : String,
    firstName : String,
    lastName : String,
    email : String,
    websites : [{type: mongoose.Schema.ObjectId, ref : "websiteModel"}],
    dateCreated : {type : Date, default: Date.now}
}, {collection : "assignment_users"});

module.exports = userSchema;