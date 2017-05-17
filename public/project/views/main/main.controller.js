(function () {
    angular
        .module("BonAppetit")
        .controller("MainController",MainController);

    function MainController($location) {
        var vm = this;
        vm.search = search;

        function search(location) {
            if (location) {
                    $location.url("/location/" + location);
            } else {
                console.log("Please enter a location")
            }
        }
    }
})();