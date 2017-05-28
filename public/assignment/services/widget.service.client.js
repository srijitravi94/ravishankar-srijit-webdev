(function () {
    angular
        .module('WAM')
        .factory('widgetService',widgetService);

    function widgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>It’s possible that we’re getting better at addressing the problems that are facing bee populations. VanEnglesdorp, a University of Maryland entomologist, believes that a new product for fighting the <a href="http://gizmodo.com/a-deadly-bee-virus-is-spreading-and-only-humans-can-sto-1756705772" rel="nofollow">mite </a><a href="http://gizmodo.com/a-deadly-bee-virus-is-spreading-and-only-humans-can-sto-1756705772" rel="nofollow"><em>Varroa destructor</em></a><em> </em>is one of the primary reasons for the more encouraging numbers this year. The mites have been a key factor in what’s commonly referred to as “colony collapse disorder” because they carry the <a href="https://en.wikipedia.org/wiki/Deformed_wing_virus" target="_blank" rel="noopener">deformed wing virus</a>.</p>'},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById : findWidgetById
        };

        return api;

        function findWidgetsByPageId(pageId) {
            var results = [];

            for(var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    results.push(widgets[w]);
                }
            }
            return results;
        }
        
        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    return angular.copy(widgets[w]);
                }
            }

            return null;
        }
    }
})();