(function () {
    angular
        .module("BonAppetit")
        .controller("searchLocationController",searchLocationController);
    
    function searchLocationController(apiService, $stateParams, $location) {
        var model = this;
        model.search = search;
        model.location = $stateParams['location'];

        function init() {
            searchResults();
        }

        return init();

        function search(location) {
            if (location) {
                $location.url("/search/" + location);
            }
            else {
                console.log("Please enter a location")
            }
        }

        function searchResults() {
          apiService
              .searchLocation(model.location)
              .then(function (response) {
                  var suggestions = [];
                  var location_suggestions = response.data.location_suggestions;
                  var a=0;

                  for(var i=0; i<location_suggestions.length; i++) {
                      suggestions[a] = location_suggestions[i];
                      a++;
                  }
                  model.suggestions = suggestions;
              });
        }
    }
})();