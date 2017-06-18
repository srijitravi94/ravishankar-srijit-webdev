(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController(websiteService, $location, currentUser) {
        var model = this;
        model.userId = currentUser._id;
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

            if(website.name === null || website.name === '' || typeof website.name === 'undefined') {
                model.errorName = "Website name is required";
                return model.errorName;
            }

            websiteService
            .createWebsite(website, model.userId)
            .then(websiteCreateSuccess, websiteCreateError);

        }

        function websiteCreateSuccess() {
            $location.url('/website');
        }

        function websiteCreateError() {
            model.errorWebsiteCreate = "Sorry, unable to create new website"
        }
    }
})();