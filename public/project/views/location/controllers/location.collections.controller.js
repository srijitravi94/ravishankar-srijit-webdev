(function () {
    angular
        .module("BonAppetit")
        .controller("locationCollectionsController",locationCollectionsController);


    function locationCollectionsController(apiService, $stateParams) {
        var model = this;
        model.city_name = $stateParams['city_name'];
        model.city_id = $stateParams['city_id'];
        model.entity_type = $stateParams['entity_type'];
        model.entity_id = $stateParams['entity_id'];

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
                    var a =0;

                    if(cityCollections != null) {
                        for(var i=0; i<cityCollections.length; i++) {
                            collections[a] = cityCollections[i].collection;
                            a++;
                        }
                    } else {
                        console.log('No collections found');
                    }
                    model.collections = collections;
                });
        }



    }
})();