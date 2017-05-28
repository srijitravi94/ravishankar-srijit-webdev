(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams, widgetService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;
        model.getEditorTemplateUrl = getEditorTemplateUrl;


        function init() {
            model.widgets = widgetService.findWidgetById(model.widgetId);
        }
        init();

        function getEditorTemplateUrl(widget) {
            var templateUrl = 'views/widget/templates/editors/widget-'+widget.toLowerCase()+'-edit.view.client.html';
            return templateUrl;
        }


    }
})();