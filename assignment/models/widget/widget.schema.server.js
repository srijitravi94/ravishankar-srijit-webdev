var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({
    _page : {type: mongoose.Schema.Types.ObjectId, ref: "pageModel"},
    widgetType : {type : String, enum : ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
    name : String,
    text : String,
    placeholder : String,
    url : String,
    width : String,
    height : String,
    rows : Number,
    size : Number,
    class : String,
    icon : String,
    deletable : Boolean,
    formattable : Boolean,
    dateCreated: {type: Date, default: Date.now}
}, {collection : "widgets"});

module.exports = widgetSchema;