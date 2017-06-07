(function () {
    angular
        .module("BonAppetit")
        .controller("restaurantDetailsController", restaurantDetailsController);
    
    function restaurantDetailsController($stateParams) {
        var model = this;
        model.restaurantId = $stateParams.restaurantId;
    }
})();