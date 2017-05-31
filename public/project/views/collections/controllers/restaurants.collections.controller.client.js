(function () {
    angular
        .module("BonAppetit")
        .controller("restaurantCollectionsController",restaurantCollectionsController);


    function restaurantCollectionsController(apiService, $stateParams) {
        var model = this;
        model.city_name = $stateParams.city_name;
        model.city_id = $stateParams.city_id;
        model.collection_id = $stateParams.collection_id;

        function init() {
            collections();
        }

        return init();

        function collections() {
            apiService
                .restaurantCollections(model.city_id, model.collection_id)
                .then(function (response) {
                    var restaurants = [];
                    var restaurantCollections = response.data.restaurants;

                    for(var r in restaurantCollections) {
                        restaurants.push(restaurantCollections[r].restaurant);
                        console.log(restaurants[r]);
                    }
                    model.restaurants = restaurants;
                });
        }
    }
})();