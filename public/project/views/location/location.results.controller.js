(function () {
    angular
        .module("BonAppetit")
        .controller("SearchLocationController",SearchLocationController);
    
    function SearchLocationController(ApiService, $stateParams) {
        var vm = this;
        vm.location = $stateParams.location;

        function init() {
            searchResults();
        }

        return init();

        function searchResults() {
          ApiService
              .searchLocation(vm.location)
              .then(function (response) {
                  var suggestions = [];
                  var location_suggestions = response.data.location_suggestions;
                  var a=0;

                  for(var i=0; i<location_suggestions.length; i++) {
                      suggestions[a] = location_suggestions[i];
                      console.log(suggestions[a]);
                      a++;
                  }
                  vm.suggestions = suggestions;
              });
        }
    }
})();