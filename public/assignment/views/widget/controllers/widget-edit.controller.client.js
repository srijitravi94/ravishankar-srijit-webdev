(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams,$location, widgetService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;
        model.getEditorTemplateUrl = getEditorTemplateUrl;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;


        function init() {
            model.widgets = widgetService.findWidgetById(model.widgetId);
        }
        init();

        function getEditorTemplateUrl(widget) {
            var templateUrl = 'views/widget/templates/editors/widget-'+widget.toLowerCase()+'-edit.view.client.html';
            return templateUrl;
        }

        function updateWidget(widget) {
            widgetService.updateWidget(model.widgetId, widget);
            $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
        }

        function deleteWidget(widget) {
            widgetService.deleteWidget(model.widgetId);
            $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
        }
    }
})();