(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);
    
    function websiteListController($routeParams, websiteService) {
        var model = this;
        model.userId = $routeParams.userId;


        function init() {
            websiteService
                .findAllWebsitesByUser(model.userId)
                .then(renderWebsiteList, renderWebsiteListError);

        }
        init();

        function renderWebsiteList(websites) {
            model.websites = websites;
        }

        function renderWebsiteListError() {
            model.error = "Sorry, unable to retrieve the websites";
        }

    }
    
    
})();