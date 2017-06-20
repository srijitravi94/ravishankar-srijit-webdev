var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.Types.ObjectId, ref: "websiteModel"},
    name: String,
    description: String,
    title : String,
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "widgetModel"}],
    dateCreated: {type: Date, default: Date.now},
    updated : Date
}, {collection : "pages"});

module.exports = pageSchema;