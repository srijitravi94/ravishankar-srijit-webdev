var app = require('../../express');
var pageModel = require('../models/page/page.model.server');


app.post('/api/assignment/website/:websiteId/page', createPage);
app.get('/api/assignment/website/:websiteId/page', findAllPagesForWebsite);
app.get('/api/assignment/page/:pageId', findPageById);
app.put('/api/assignment/page/:pageId', updatePage);
app.delete('/api/assignment/website/:websiteId/page/:pageId', deletePage);


function createPage(req, res) {
    var websiteId = req.params.websiteId;
    var page = req.body;

    pageModel
        .createPage(page, websiteId)
        .then(function (page) {
            res.json(page);
        });
}

function findAllPagesForWebsite(req, res) {
    var websiteId = req.params.websiteId;

    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (page) {
           res.json(page);
        });
}

function findPageById(req, res) {
    var pageId = req.params.pageId;

    pageModel
        .findPageById(pageId)
        .then(function (page) {
           res.json(page);
        });
}

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;

    pageModel
        .updatePage(page, pageId)
        .then(function (page) {
            res.json(page);
        });
}

function deletePage(req, res) {
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;

    pageModel
        .deletePage(pageId, websiteId)
        .then(function (status) {
            res.send(status);
        });
}
