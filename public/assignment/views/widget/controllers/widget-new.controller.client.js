(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams, widgetService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetType = $routeParams.widgetType;
        model.getEditorTemplateUrl = getEditorTemplateUrl;
        model.goToWidget = goToWidget;
        model.createWidget = createWidget;

        function init() {
            model.widgets = {"widgetType" : model.widgetType};
        }
        init();


        function getEditorTemplateUrl(widget) {
            var templateUrl = 'views/widget/templates/editors/widget-'+widget.toLowerCase()+'-edit.view.client.html';
            return templateUrl;
        }

        function goToWidget(widgetType) {
            $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget/new/"+widgetType.toLowerCase());
        }
        
        function createWidget(widget) {
            widgetService
                .createWidget(model.pageId, widget)
                .then(createWidgetSuccess, createWidgetError);
        }

        function createWidgetSuccess() {
            $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
        }

        function createWidgetError() {
            model.errorWidgetCreate = "Sorry, unable to create widget";
        }

    }
})();