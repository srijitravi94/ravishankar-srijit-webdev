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

        function createWebsite(name, description) {

            if(name === null || name === '' || typeof name === 'undefined') {
                model.errorName = "Website name is required";
                return model.errorName;
            }

            var website = {
                name        : name,
                description : description
            };

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