(function () {
    angular
        .module("BonAppetit")
        .controller("locationCollectionsController",locationCollectionsController);


    function locationCollectionsController(apiService, $stateParams) {
        var model = this;
        model.city_name = $stateParams.city_name;
        model.city_id = $stateParams.city_id;

        function init() {
            cityCollections();
        }

        return init();

        function cityCollections() {
            apiService
                .searchCollections(model.city_id)
                .then(function (response) {
                    var collections = [];
                    var cityCollections = response.data.collections;

                    if(cityCollections != null) {
                        for(var c in cityCollections) {
                            collections.push(cityCollections[c].collection);
                            console.log(collections[c]);
                        }
                    } else {
                        console.log('No collections found');
                    }
                    model.collections = collections;
                });
        }
    }
})();