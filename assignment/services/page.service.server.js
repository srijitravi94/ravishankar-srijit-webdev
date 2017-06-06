var app = require('../../express');

var pages = [
    { "_id": "321", "name": "Post 1", "created" : "2017-06-04", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "created" : "2017-06-05", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "created" : "2017-06-06", "websiteId": "456", "description": "Lorem" }
];

app.post('/api/assignment/website/:websiteId/page', createPage);
app.get('/api/assignment/website/:websiteId/page', findAllPagesForWebsite);
app.get('/api/assignment/page/:pageId', findPageById);
app.put('/api/assignment/page/:pageId', updatePage);
app.delete('/api/assignment/page/:pageId', deletePage);


function createPage(req, res) {
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    page.created = new Date();
    pages.push(page);
    res.json(page);
}

function findAllPagesForWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var results = [];

    for(var p in pages) {
        if(pages[p].websiteId === websiteId) {
            results.push(pages[p]);
        }
    }
    res.json(results);
}

function findPageById(req, res) {
    var pageId = req.params.pageId;

    for (var p in pages) {
        if(pages[p]._id === pageId) {
            res.json(pages[p]);
            return;
        }
    }
    res.json(404);
}

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;

    page.updated = new Date();
    for(var p in pages) {
        if(pages[p]._id === pageId) {
            pages[p] = page;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deletePage(req, res) {
    var pageId = req.params.pageId;

    for(var p in pages) {
        if(pages[p]._id == pageId) {
            pages.splice(p, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}
