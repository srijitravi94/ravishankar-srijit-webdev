(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams, widgetService, $location, currentUser) {
        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;
        model.widgetType = $routeParams.widgetType;
        model.getEditorTemplateUrl = getEditorTemplateUrl;
        model.goToWidget = goToWidget;
        model.updateWidget = updateWidget;

        function init() {
            model.widgets = {"widgetType" : model.widgetType};
        }
        init();


        function getEditorTemplateUrl(widget) {
            var templateUrl = 'views/widget/templates/editors/widget-'+widget+'-edit.view.client.html';
            return templateUrl;
        }

        function goToWidget(widgetType) {
            var widget={
                widgetType : widgetType
            };

            widgetService
                .createWidget(model.pageId, widget)
                .then(function (widget) {
                    $location.url("/website/"+model.websiteId+"/page/"+model.pageId+"/widget/new/"+widgetType+ "/" +widget._id);
                });
        }


        function updateWidget(widget) {
            var widgets ={
                _id        : model.widgetId,
                pageId     : model.pageId,
                name       : widget.name,
                text       : widget.text,
                size       : widget.size,
                width      : widget.width,
                url        : widget.url,
                placeholder: widget.placeholder,
                rows       : widget.rows,
                formattable: widget.formattable,
                widgetType : widget.widgetType
            };

            if(widgets.name === null || widgets.name === '' || typeof widgets.name === 'undefined') {
                model.errorName = "Widget name is required";
                return;
            }

            if(widgets.text === null || widgets.text === '' || typeof widgets.text === 'undefined') {
                model.errorName = "Widget text is required";
                return;
            }

            widgetService
                .updateWidget(model.widgetId, widgets)
                .then(updateSuccess, updateError);
        }

        function updateSuccess() {
            $location.url("/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
        }

        function updateError() {
            model.errorWidgetCreate = "Sorry, unable to create the widget";
        }

    }
})();