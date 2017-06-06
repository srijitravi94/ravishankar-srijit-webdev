(function () {
    angular
        .module('WAM')
        .factory('flickrService', flickrService);

    function flickrService($http) {

        var api = {
            searchPhotos : searchPhotos
        };
        var key = "77d381009ebdcab29fc3a07a3eb3871f";
        var secret = "ca32133539212fee";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        return api;

            function searchPhotos(searchText) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchText);
            return $http.get(url);
        }
    }
})();