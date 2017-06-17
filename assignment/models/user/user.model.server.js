var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('userModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addWebsite = addWebsite; 
userModel.deleteWebsite = deleteWebsite;
userModel.findUserByGoogleId = findUserByGoogleId;

module.exports = userModel;


function createUser(user) {
    if(user.roles) {
        user.roles = user.roles.split(',');
    } else {
        user.roles = ["USER"];
    }
    return userModel
        .create(user);
}

function findUserById(userId) {
    return userModel
        .findById(userId);
}

function findAllUsers() {
    return userModel
        .find();
}

function findUserByUsername(username) {
    return userModel
        .findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel
        .findOne({username : username, password : password});
}

function updateUser(userId, newUser) {
    delete newUser.username;

    if(typeof newUser.roles === 'string') {
        newUser.roles = newUser.roles.split(',');
    }
    return userModel
        .update({_id: userId}, {$set: newUser});
}

function deleteUser(userId) {
    return userModel
        .remove({_id : userId});
}

function addWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
           user.websites.push(websiteId);
           return user.save();
        });
}

function deleteWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        });
}

function findUserByGoogleId(googleId) {
    return userModel
        .findOne({'google.id': googleId});
}
