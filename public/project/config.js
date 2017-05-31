(function () {
    angular
        .module('BonAppetit')
        .config(configuration);

    function configuration($stateProvider, $urlRouterProvider,$locationProvider) {

        $locationProvider.hashPrefix("");

        $stateProvider

        //route for the main page
            .state("index",{
                url:"/",
                views: {
                    "header": {
                        templateUrl: "views/common/header.view.client.html"
                    },
                    "content": {
                        templateUrl: "views/main/templates/main.view.client.html",
                        controller: "mainController",
                        controllerAs: "model"
                    }
                }
            })

            //route for register page
            .state("index.register", {
                url:"register",
                views: {
                    "content@": {
                        templateUrl : "views/users/templates/register.view.client.html"
                    }
                }
            })

            //route for login page
            .state("index.login", {
                url:"login",
                views: {
                    "content@": {
                        templateUrl : "views/users/templates/login.view.client.html"
                    }
                }

            })

            //route for location search results page
            .state("index.location", {
                url:"search/:location",
                views: {
                    "content@": {
                        templateUrl : "views/location/templates/location.results.view.client.html",
                        controller: "searchLocationController",
                        controllerAs: "model"
                    }
                }
            })

            //route for collections in a location
            .state("index.collections", {
                url:":city_name/:city_id",
                views: {
                    "content@": {
                        templateUrl : "views/location/templates/location.collections.view.client.html",
                        controller: "locationCollectionsController",
                        controllerAs: "model"
                    }
                }
            })

            //route for restaurants inside a collection
            .state("index.restaurantCollections", {
                url:":city_name/:city_id/collections/:collection_id",
                views: {
                    "content@": {
                        templateUrl : "views/collections/templates/restaurants.collections.view.client.html",
                        controller: "restaurantCollectionsController",
                        controllerAs: "model"
                    }
                }
            });

        $urlRouterProvider.otherwise("/");

    }
})();