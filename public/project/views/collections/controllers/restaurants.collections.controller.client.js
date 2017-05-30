(function () {
    angular
        .module("BonAppetit")
        .controller("restaurantCollectionsController",restaurantCollectionsController);
    
    function restaurantCollectionsController(apiService , $stateParams) {
        var model = this;
        model.city_name = $stateParams.city_name;
        model.city_id = $stateParams.city_id;
        model.collection_id = $stateParams.collection_id;
    }
    
})();