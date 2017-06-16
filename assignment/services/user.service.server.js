var app           = require('../../express');
var userModel     = require('../models/user/user.model.server');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post('/api/assignment/user', createUser);
app.get('/api/assignment/user', findAllUsers);
app.get('/api/assignment/user/:userId', findUserById);
app.put('/api/assignment/user/:userId',updateUser);
app.delete('/api/assignment/user/:userId',deleteUser);

app.post('/api/assignment/login', passport.authenticate('local'), login);
app.get('/api/assignment/checkLoggedIn', checkLoggedIn);
app.post('/api/assignment/register', register);
app.post('/api/assignment/logout', logout);


function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(function(user) {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }

            },
            function(err) {
                if (err) {
                    return done(err, false);
                }
            }
        );
}

function checkLoggedIn(req, res) {
   if(req.isAuthenticated()) {
       res.json(req.user);
   } else {
       res.send('0');
   }
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function register(req, res) {
    var newUser = req.body;
    userModel
        .createUser(newUser)
        .then(function (user) {
            req.login(user, function (status) {
               res.send(status);
            });
        });
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function createUser(req, res) {
    var newUser = req.body;

    userModel
        .createUser(newUser)
        .then(function (newUser) {
           res.json(newUser);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findAllUsers (req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
               if(user) {
                   res.json(user);
               } else {
                   res.sendStatus(404);
               }
            });
    }

    else if (username){
        userModel
            .findUserByUsername(username)
            .then(function (user) {
               if(user) {
                   res.json(user);
               } else
                   res.sendStatus(404);
            });
    }

    else {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            })
    }
}

function findUserById(req, res) {
    var userId = req.params.userId;

    userModel
        .findUserById(userId)
        .then(function (user) {
           res.json(user);
        });
}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;

    userModel
        .updateUser(userId, user)
        .then(function (status) {
           res.send(status);
        });
}

function deleteUser(req, res) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
        });
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}