(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);

    function pageService() {

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            findPageByWebsiteId : findPageByWebsiteId,
            createPage : createPage,
            findPageById : findPageById,
            deletePage : deletePage,
            updatePage : updatePage
        };
        return api;

        function createPage(page) {
            page._id = (new Date()).getTime() + "";
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId) {
            var results = [];

            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    pages[p].created = new Date();
                    pages[p].updated = new Date();
                    results.push(pages[p]);
                }
            }
            return results;
        }

        function findPageById(pageId) {
            for (var p in pages) {
                if(pageId === pages[p]._id) {
                    return angular.copy(pages[p]);
                }
            }
        }

        function deletePage(pageId) {
            var page = findPageById(pageId);
            var index = pages.indexOf(page);
            pages.splice(index, 1);
        }

        function updatePage(pageId, newPage) {
            for(var p in pages) {
                var page = pages[p];
                if(page._id === pageId) {
                    pages[p].name = newPage.name;
                    pages[p].description = newPage.description;

                    return page;
                }
            }
            return null;
        }

    }
})();