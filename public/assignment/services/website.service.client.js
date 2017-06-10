(function () {
    angular
        .module('WAM')
        .factory('websiteService', websiteService);
    
    function websiteService($http) {

        var api = {
            createWebsite : createWebsite,
            findAllWebsitesByUser : findAllWebsitesByUser,
            findWebsiteById : findWebsiteById,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite
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

        function deleteWebsite(userId, websiteId) {
            var url = "/api/assignment/user/" +userId+ "/website/" +websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
    
})();