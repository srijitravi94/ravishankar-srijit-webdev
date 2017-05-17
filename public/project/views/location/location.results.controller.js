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
                 vm.suggestions = response.data.location_suggestions;
                 console.log(vm.suggestions);
              });
        }
    }
})();