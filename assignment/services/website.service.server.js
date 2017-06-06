var app = require('../../express');

var websites = [
    { "_id": "123", "name": "Facebook",    "created" : "2017-06-06", "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "created" : "2017-06-05", "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "created" : "2017-06-04", "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "created" : "2017-06-06", "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "created" : "2017-06-05", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "created" : "2017-06-04", "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "created" : "2017-06-03", "developerId": "234", "description": "Lorem" }
];

app.post('/api/assignment/user/:userId/website', createWebsite);
app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);
app.get('/api/assignment/website/:websiteId', findWebsiteById);
app.put('/api/assignment/website/:websiteId', updateWebsite);
app.delete('/api/assignment/website/:websiteId', deleteWebsite);


function createWebsite(req, res) {
    var website = req.body;
    website._id = (new Date()).getTime() + "";
    website.created = new Date();
    websites.push(website);
    res.json(website);
}

function findAllWebsitesForUser(req, res) {
    var userId = req.params.userId;
    var results = [];

    for(var w in websites) {
        if(websites[w].developerId === userId) {
            results.push(websites[w]);
        }
    }
    res.json(results);
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;

    for(var w in websites) {
        if(websites[w]._id === websiteId) {
            res.json(websites[w]);
            return;
        }
    }
    res.sendStatus(404);
}

function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body;

    website.updated = new Date();
    for(var w in websites) {
        if(websites[w]._id === websiteId) {
            websites[w] = website;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    for(var w in websites) {
        if(websites[w]._id === websiteId) {
            websites.splice(w, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}