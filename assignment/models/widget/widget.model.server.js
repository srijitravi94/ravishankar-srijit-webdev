var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('widgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.findWidgetByIds = findWidgetsByIds;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel
        .create(widget)
        .then(function (widget) {
           pageModel
               .addWidget(pageId, widget._id);
           return widget;
        });
}

function findAllWidgetsForPage(pageId) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
           return page.widgets;
        });
}

function updateWidget(widgetId, widget) {
    return widgetModel
        .update({_id: widgetId}, {$set: widget})
}

function findWidgetById(widgetId) {
    return widgetModel
        .findById({_id : widgetId});
}

function findWidgetsByIds(widgetIds) {
    return widgetModel
        .find({'_id': {$in: widgetIds}})
}

function deleteWidget(pageId, widgetId) {
    return widgetModel
        .remove({_id : widgetId})
        .then(function (status) {
            return pageModel
                .deleteWidget(pageId, widgetId);
        });
}


function reorderWidget(pageId, start, end) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var widgets = page.widgets;
            widgets.splice(end-1, 0, widgets.splice(start-1, 1)[0]);
            page.widgets = widgets;

            return pageModel
                .updatePage(page, pageId);
        })
}