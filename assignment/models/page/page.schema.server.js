var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.Types.ObjectId, ref: "websiteModel"},
    name: String,
    description: String,
    widgets: [{type: mongoose.Schema.ObjectId, ref: "widgetModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection : "assignment_pages"});

module.exports = pageSchema;