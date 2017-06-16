(function () {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController);

    function widgetListController($sce, $routeParams, widgetService, currentUser) {
        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetUrl = widgetUrl;

        function init() {
            widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(renderWidgetList, renderWidgetListError);

            function renderWidgetList(widgets) {
                model.widgets = widgets;
            }

            function renderWidgetListError() {
                model.error = "Sorry, unable to retrieve widgets";
            }
        }
        init();

        function trust(html) {
            return $sce.trustAsHtml(html);
        }
        
        function getYouTubeEmbedUrl(linkUrl) {
            var embedUrl ="https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length -1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function widgetUrl(widget) {
            var url = 'views/widget/templates/common-content/widget-'+widget.toLowerCase()+'.view.client.html';
            return url;
        }
    }
})();