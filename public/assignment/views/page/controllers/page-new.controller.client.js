(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);
    
    function pageNewController($routeParams, pageService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.createPage = createPage;

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

        function createPage(page) {
            pageService
                .createPage(page, model.websiteId)
                .then(pageCreateSuccess, pageCreateError);
        }

        function pageCreateSuccess() {
            $location.url('/user/' +model.userId+ '/website/' +model.websiteId+ '/page');
        }

        function pageCreateError() {
            model.errorPageCreate = "Sorry, unable to create new page";
        }
    }
})();