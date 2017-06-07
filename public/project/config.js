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
                url:":cityName/:cityId",
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
                url:":cityName/:cityId/collections/:collectionId/restaurants",
                views: {
                    "content@": {
                        templateUrl : "views/collections/templates/restaurants.collections.view.client.html",
                        controller: "restaurantCollectionsController",
                        controllerAs: "model"
                    }
                }
            })

            //route for search results for restaurants
            .state("index.restaurantSearch", {
                url : ":cityName/:cityId/restaurants/search/:restaurant",
                views: {
                    "content@": {
                        templateUrl: "views/restaurants/templates/restaurant.results.view.client.html",
                        controller: "searchRestaurantController",
                        controllerAs: "model"
                    }
                }
            })

            //route for restaurant details page
            .state("index.restaurantDetails", {
                url : ":cityName/:cityId/restaurant/:restaurantId",
                views: {
                    "content@": {
                        templateUrl: "views/restaurants/templates/restaurant.details.view.client.html",
                        controller: "restaurantDetailsController",
                        controllerAs: "model"
                    }
                }
            });


        $urlRouterProvider.otherwise("/");

    }
})();