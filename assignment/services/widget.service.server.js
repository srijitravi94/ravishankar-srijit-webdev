var app = require('../../express');

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>It’s possible that we’re getting better at addressing the problems that are facing bee populations. VanEnglesdorp, a University of Maryland entomologist, believes that a new product for fighting the <a href="http://gizmodo.com/a-deadly-bee-virus-is-spreading-and-only-humans-can-sto-1756705772" rel="nofollow">mite </a><a href="http://gizmodo.com/a-deadly-bee-virus-is-spreading-and-only-humans-can-sto-1756705772" rel="nofollow"><em>Varroa destructor</em></a><em> </em>is one of the primary reasons for the more encouraging numbers this year. The mites have been a key factor in what’s commonly referred to as “colony collapse disorder” because they carry the <a href="https://en.wikipedia.org/wiki/Deformed_wing_virus" target="_blank" rel="noopener">deformed wing virus</a>.</p>'},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

app.get('/api/assignment/page/:pageId/widget', findAllWidgetsForPage);
app.post('/api/assignment/page/:pageId/widget', createWidget);
app.get('/api/assignment/widget/:widgetId', findWidgetById);
app.put('/api/assignment/widget/:widgetId', updateWidget);
app.delete('/api/assignment/widget/:widgetId', deleteWidget);


function findAllWidgetsForPage(req, res) {
    var results = [];
    var pageId = req.params.pageId;

    for(var w in widgets) {
        if(widgets[w].pageId === pageId) {
            results.push(widgets[w]);
        }
    }
    res.json(results);
}

function createWidget(req, res) {
    var pageId = req.params.pageId;
    var widget = req.body;
    widget.pageId = pageId;
    widget._id = (new Date()).getTime() + "";
    widgets.push(widget);
    res.json(widget);
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;

    for(var w in widgets) {
        if(widgets[w]._id === widgetId) {
            res.json(widgets[w]);
        }
    }
}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;

    for(var w in widgets) {
        if(widgets[w]._id === widgetId) {
            widgets[w] = widget;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;

    for(var w in widgets) {
        if(widgets[w]._id === widgetId) {
            widgets.splice(w, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}