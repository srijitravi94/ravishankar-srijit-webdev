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
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(renderPageList, renderPageListError);

            function renderPageList(pages) {
                model.pages = pages;
            }

            function renderPageListError() {
                model.error = "Sorry, unable to retrieve the pages";
            }

            pageService
                .findPageById(model.pageId)
                .then(renderPage, renderPageError);

            function renderPage(page) {
                model.page = page;
            }

            function renderPageError() {
                model.errorPage = "Sorry, unable to retrieve the page";
            }
        }
        init();

        function deletePage(pageId) {
            pageService
                .deletePage(pageId, model.websiteId)
                .then(deleteSuccess, deleteError);
        }

        function deleteSuccess() {
            $location.url('/user/'+model.userId+'/website/' +model.websiteId+ '/page');
        }

        function deleteError() {
            model.errorDelete = "Sorry, unable to delete the page";
        }

        function updatePage(newPage) {
            pageService
                .updatePage(model.pageId, newPage)
                .then(updateSuccess, updateError);

            function updateSuccess() {
                $location.url('/user/'+model.userId+'/website/' +model.websiteId+ '/page');
            }

            function updateError() {
                model.errorUpdate = "Sorry, unable to update the page";
            }
        }
    }

})();