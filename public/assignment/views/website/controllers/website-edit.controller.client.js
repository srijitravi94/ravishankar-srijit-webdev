(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);
    
    function websiteEditController($routeParams, websiteService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init() {
            websiteService
                .findAllWebsitesByUser(model.userId)
                .then(renderWebsiteList, renderWebsiteListError);

            function renderWebsiteList(websites) {
                model.websites = websites;
            }

            function renderWebsiteListError() {
                model.errorWebsites = "Sorry, unable to retrieve the websites";
            }

            websiteService
                .findWebsiteById(model.websiteId)
                .then(renderWebsite, renderWebsiteError);

            function renderWebsite(website) {
                model.website = website;
            }

            function renderWebsiteError() {
                model.errorWebsite = "Sorry, unable to retrieve the website";
            }
        }
        init();


        function updateWebsite(newWebsite) {
            websiteService
                .updateWebsite(model.websiteId, newWebsite)
                .then(updateSuccess, updateError);

            function updateSuccess() {
                $location.url('/user/'+model.userId+'/website');
            }
            
            function updateError() {
                model.errorUpdate = "Sorry, unable to update the website";
            }
        }

        function deleteWebsite(website) {
            websiteService
                .deleteWebsite(model.userId, model.websiteId)
                .then(deleteSuccess, deleteError);

            function deleteSuccess() {
                $location.url('/user/'+model.userId+'/website');
            }

            function deleteError() {
                model.errorDelete = "Sorry, unable to delete the website";
            }
        }

    }

})();