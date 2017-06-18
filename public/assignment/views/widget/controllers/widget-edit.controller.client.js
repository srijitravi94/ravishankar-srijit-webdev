(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams,$location, widgetService, currentUser) {
        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;
        model.getEditorTemplateUrl = getEditorTemplateUrl;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;


        function init() {
            widgetService
                .findWidgetById(model.widgetId)
                .then(renderWidget, renderWidgetError);

            function renderWidget(widgets) {
                model.widgets = widgets;
            }

            function renderWidgetError() {
                model.errorWidget = "Sorry, unable to render the widget";
            }
        }
        init();

        function getEditorTemplateUrl(widget) {
            var templateUrl = 'views/widget/templates/editors/widget-' +widget+ '-edit.view.client.html';
            return templateUrl;
        }

        function updateWidget(widget) {

            if(widget.name === null || widget.name === '' || typeof widget.name === 'undefined') {
                model.errorName = "Widget name is required";
                return;
            }

            if(widget.text === null || widget.text === '' || typeof widget.text === 'undefined') {
                model.errorName = "Widget text is required";
                return;
            }

            widgetService
                .updateWidget(model.widgetId, widget)
                .then(updateSuccess, updateError);
        }

        function updateSuccess() {
            $location.url("/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
        }

        function updateError() {
            model.errorUpdate = "Sorry, unable to update the widget";
        }


        function deleteWidget(widget) {
            widgetService
                .deleteWidget(model.pageId, model.widgetId)
                .then(deleteSuccess, deleteError);

            function deleteSuccess() {
                $location.url("/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
            }

            function deleteError() {
                model.errorDelete = "Sorry, unable to delete the widget";
            }

        }
    }
})();