(function () {
    angular
        .module('WAM')
        .factory('websiteService', websiteService);
    
    function websiteService($http) {

        var api = {
            findAllWebsitesByUser : findAllWebsitesByUser,
            findWebsiteById : findWebsiteById,
            deleteWebsite : deleteWebsite,
            createWebsite : createWebsite,
            updateWebsite : updateWebsite
        };
        return api;

        function createWebsite(website, userId) {
            var url = "/api/assignment/user/" +userId+ "/website";
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllWebsitesByUser(userId) {
            var url = "/api/assignment/user/" +userId+ "/website";
            return $http.get(url)
                .then(function (response) {
                   return response.data;
                });

        }

        function findWebsiteById(websiteId) {
            var url = "/api/assignment/website/" +websiteId;
            return $http.get(url)
                .then(function (response) {
                   return response.data;
                });
        }
        
        function updateWebsite(websiteId, newWebsite) {
            var url = "/api/assignment/website/" +websiteId;
            return $http.put(url, newWebsite)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWebsite(websiteId) {
            var url = "/api/assignment/website/" +websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
    
})();