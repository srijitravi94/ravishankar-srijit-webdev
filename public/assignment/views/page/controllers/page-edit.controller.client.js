(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);
    
    function pageEditController($routeParams, pageService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.deletePage = deletePage;
        model.updatePage = updatePage;

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
            model.page = pageService.findPageById(model.pageId);
        }
        init();

        function deletePage(pageId) {
            pageService.deletePage(pageId);
            $location.url('/user/'+model.userId+'/website/' +model.websiteId+ '/page');
        }

        function updatePage(newPage) {
            pageService.updatePage(model.pageId, newPage);
            $location.url('/user/'+model.userId+'/website/' +model.websiteId+ '/page');
        }
    }

})();