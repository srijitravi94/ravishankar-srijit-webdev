var app = require('../../express');
var widgetModel = require('../models/widget/widget.model.server');

var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });


app.post('/api/assignment/page/:pageId/widget', createWidget);
app.get('/api/assignment/page/:pageId/widget', findAllWidgetsForPage);
app.get('/api/assignment/widget/:widgetId', findWidgetById);
app.put('/api/assignment/widget/:widgetId', updateWidget);
app.delete('/api/assignment/page/:pageId/widget/:widgetId', deleteWidget);
app.post ('/api/assignment/upload', upload.single('myFile'), uploadImage);
app.put ('/api/assignment/page/:pageId/widget', reorderWidget);


function createWidget(req, res) {
    var pageId = req.params.pageId;
    var widget = req.body;

    widgetModel
        .createWidget(pageId, widget)
        .then(function (widget) {
           res.json(widget);
        });
}

function findAllWidgetsForPage(req, res) {
    var pageId = req.params.pageId;

    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widgetIds) {
            widgetModel
                .findWidgetByIds(widgetIds)
                .then(function (widgets) {
                    var listOfWidgets = getWidgetList(widgets);
                    var widgetList = [];

                    for (var w = 0; w < widgetIds.length; w++) {
                        var widgetId = widgetIds[w];
                        var widget = listOfWidgets[widgetId];
                        widgetList.push(widget);
                    }
                    res.json(widgetList);
                });
        });
}

function getWidgetList(widgets) {
    var widgetList = [];
    for (var w in widgets) {
        widgetList[widgets[w]._id] = widgets[w];
    }
    return widgetList;
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        });
}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;

    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (widget) {
           res.json(widget);
        });
}

function deleteWidget(req, res) {
    var pageId = req.params.pageId;
    var widgetId = req.params.widgetId;

    widgetModel
        .deleteWidget(pageId, widgetId)
        .then(function (status) {
           res.send(status)
        });
}


function uploadImage(req, res) {
    var widgetId = req.body.widgetId;
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;
    var width = req.body.width;
    var myFile = req.file;

    var originalname = myFile.originalname;
    var filename = myFile.filename;
    var path = myFile.path;
    var destination = myFile.destination;
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
           widget.url = '/assignment/uploads/' + filename;
            widgetModel
               .updateWidget(widgetId, widget)
               .then(function () {
                   res.redirect("/assignment/index.html#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/")
               });
        });
}


function reorderWidget(req, res) {
    var start  = req.query.start;
    var end    = req.query.end;
    var pageId = req.params.pageId;

    widgetModel
        .reorderWidget(pageId, start, end)
        .then(function (response) {
            res.send(response);
        });
}
