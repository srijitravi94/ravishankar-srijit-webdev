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
            model.websites = websiteService.findAllWebsitesByUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);
        }
        init();

        function deleteWebsite(website) {
            websiteService.deleteWebsite(model.websiteId);
            $location.url('/user/'+model.userId+'/website');
        }

        function updateWebsite(newWebsite) {
            websiteService.updateWebsite(model.websiteId, newWebsite);
            $location.url('/user/'+model.userId+'/website');
        }
    }

})();