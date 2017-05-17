(function () {
    angular
        .module("BonAppetit")
        .factory("ApiService", apiService);
    
    function apiService($http) {

        var api ={
            "searchLocation" : searchLocation
        };

        var baseUrl = "https://developers.zomato.com/api/v2.1/";
        var apikey = "&apikey=0393efd0fa7d592433e675f2a7c2729d";
        return api;
        
        
        function searchLocation(location) {
            var searchLocationUrl = baseUrl + "locations?query=" + location + "&count=10" + apikey;
            return $http.get(searchLocationUrl);
        }
    }
})();