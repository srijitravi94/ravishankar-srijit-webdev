var app            = require('../../express');
var userModel      = require('../models/user/user.model.server');
var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
var bcrypt         = require('bcrypt-nodejs');

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};
passport.use(new GoogleStrategy(googleConfig, googleStrategy));

var FacebookStrategy = require('passport-facebook').Strategy;
var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
    profileFields : ['id', 'emails','name']
};
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


app.post('/api/assignment/user',isAdmin, createUser);
app.get('/api/assignment/user',isAdmin, findAllUsers);
app.delete('/api/assignment/user/:userId',isAdmin, deleteUser);
app.put('/api/assignment/user/:userId',isAdmin, updateUser);

app.get('/api/assignment/username', findUserByUsername);
app.get('/api/assignment/user/:userId', findUserById);
app.put('/api/assignment/userProfile/:userId', updateIndividualUser);

app.post('/api/assignment/login', passport.authenticate('local'), login);
app.get('/api/assignment/checkLoggedIn', checkLoggedIn);
app.get('/api/assignment/checkAdmin', checkAdmin);
app.post('/api/assignment/register', register);
app.post('/api/assignment/unregister', unregister);
app.post('/api/assignment/logout', logout);

app.get('/auth/google',
    passport.authenticate('google', {
            scope : ['profile', 'email']
        })
);

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/assignment/index.html#/profile',
        failureRedirect: '/assignment/index.html#/login'
    })
);


app.get('/auth/facebook',
    passport.authenticate('facebook', {
        scope : ['email']
    })
);

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/assignment/index.html#/profile',
        failureRedirect: '/assignment/index.html#/login'
    })
);

function localStrategy(username, password, done) {

    userModel
        .findUserByUsername(username)
        .then(function(user) {
            if(user) {
                if (bcrypt.compareSync (password, user.password)) {
                    return userModel
                        .findUserByCredentials(username, user.password)
                        .then(function (user) {
                            if (user) {
                                return done(null, user);
                            } else {
                                return done(null, false);
                            }
                        });
                }
                else {
                    return done(null, false);
                }
            } else {
                return done(null, false);
            }
    });
}


function checkLoggedIn(req, res) {
   if(req.isAuthenticated()) {
       res.json(req.user);
   } else {
       res.send('0');
   }
}

function checkAdmin(req, res) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
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

    newUser.password = bcrypt.hashSync(newUser.password);

    userModel
        .createUser(newUser)
        .then(function (user) {
            req.login(user, function (status) {
               res.send(status);
            });
        });
}

function unregister(req, res) {
    var userId = req.user._id;

    userModel
        .deleteUser(userId)
        .then(function (user) {
            req.logout();
            res.sendStatus(200);
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

function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function findAllUsers (req, res) {

    userModel
        .findAllUsers()
        .then(function (users) {
            res.json(users);
        })
}

function findUserByUsername(req, res) {
    var username = req.query.username;

    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if(user) {
                res.json(user);
            } else
                res.sendStatus(404);
        });
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

function updateIndividualUser(req, res) {
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

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            })

        .then(function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            });
}


function facebookStrategy(accessToken, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(function (user) {
            if(user) {
                return done(null, user);
            } else {
                var email = profile.emails[0].value;
                var emailParts = email.split("@");
                var newFacebookUser = {
                    username:  emailParts[0],
                    firstName: profile.name.givenName,
                    lastName:  profile.name.familyName,
                    email:     email,
                    facebook: {
                        id:    profile.id,
                        token: accessToken
                    }
                };
                return userModel
                    .createUser(newFacebookUser);
            }
        }, function(err) {
            if (err) { return done(err); }
        })

        .then(function(user){
                return done(null, user);
            },
            function(err){
                if (err) {
                    return done(err);
                }
            });
}