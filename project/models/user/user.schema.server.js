var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    username : {type : String, unique : true},
    password : String,
    email : String,
    phone : Number,
    dateCreated : {type : Date, default: Date.now}
}, {collection : "project_users"});

module.exports = userSchema;