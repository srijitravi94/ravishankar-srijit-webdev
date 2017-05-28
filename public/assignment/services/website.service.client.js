(function () {
    angular
        .module('WAM')
        .factory('websiteService', websiteService);
    
    function websiteService() {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];


        var api = {
            findAllWebsitesByUser : findAllWebsitesByUser,
            findWebsiteById : findWebsiteById,
            deleteWebsite : deleteWebsite,
            createWebsite : createWebsite,
            updateWebsite : updateWebsite
        };
        return api;

        function createWebsite(website) {
            website._id = (new Date()).getTime() + "";
            websites.push(website);
        }

        function findAllWebsitesByUser(userId) {
            var results = [];

            for(var w in websites) {
                if(websites[w].developerId === userId) {
                    websites[w].created = new Date();
                    websites[w].updated = new Date();
                    results.push(websites[w]);
                }
            }

            return results;
        }

        function findWebsiteById(websiteId) {
            for(var w in websites) {
                if(websites[w]._id === websiteId) {
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function deleteWebsite(websiteId) {
            for(var w in websites) {
                if(websites[w]._id == websiteId) {
                    websites.splice(w, 1);
                }
            }
        }
        
        function updateWebsite(websiteId, newWebsite) {
            for(var w in websites) {
                var website = websites[w];
                if(website._id === websiteId) {
                    websites[w].name = newWebsite.name;
                    websites[w].description = newWebsite.description;

                    return website;
                }
            }
            return null;
        }

    }
    
})();