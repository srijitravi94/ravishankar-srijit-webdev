(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);

    function pageService($http) {

        var api = {
            createPage : createPage,
            findAllPagesForWebsite : findAllPagesForWebsite,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage
        };
        return api;

        function createPage(page, websiteId) {
            var url = "/api/assignment/website/" +websiteId+ "/page";
            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllPagesForWebsite(websiteId) {
            var url = "/api/assignment/website/" +websiteId+ "/page";
            return $http.get(url)
                .then(function (response) {
                   return response.data;
                });
        }

        function findPageById(pageId) {
            var url = "/api/assignment/page/" +pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePage(pageId, newPage) {
            var url = "/api/assignment/page/" +pageId;
            return $http.put(url, newPage)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePage(pageId) {
            var url = "/api/assignment/page/" +pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();