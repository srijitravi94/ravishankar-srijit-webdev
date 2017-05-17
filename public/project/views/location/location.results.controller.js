(function () {
    angular
        .module("BonAppetit")
        .controller("SearchLocationController",SearchLocationController);
    
    function SearchLocationController(ApiService, $stateParams) {
        var vm = this;
        var location = $stateParams.location;

        function init() {
            searchResults();
        }

        return init();

        function searchResults() {
          vm.hello = location;
        }

    }
})();