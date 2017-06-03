(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);
    
    function pageListController($routeParams, pageService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;


        function init() {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(renderPageList, renderPageListError);

            function renderPageList(pages) {
                model.pages = pages;
            }

            function renderPageListError() {
                model.error = "Sorry, unable to retrieve the pages";
            }
        }
        init();

    }
    
    
})();