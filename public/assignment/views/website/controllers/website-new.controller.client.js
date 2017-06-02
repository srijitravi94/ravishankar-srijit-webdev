(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController($routeParams, websiteService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.createWebsite = createWebsite;

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

        function createWebsite(website) {
            website.developerId = model.userId;
            websiteService
                .createWebsite(website, model.userId)
                .then(websiteCreateSuccess, websiteCreateError);
        }

        function websiteCreateSuccess() {
            $location.url('/user/'+model.userId+'/website');
        }

        function websiteCreateError() {
            model.errorWebsiteCreate = "Sorry, unable to create new website"
        }
    }
})();