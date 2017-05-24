$(document).click(function(e) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768){
            $("#collapsable-nav").collapse("hide");
    }
});

(function () {
    angular
        .module("BonAppetit",["ui.router","angularUtils.directives.dirPagination"])
        .config(configuration);

            function configuration($stateProvider, $urlRouterProvider,$locationProvider) {

            $locationProvider.hashPrefix("");

            $stateProvider

            //route for the main page
                .state("index",{
                    url:"/",
                    views: {
                        "header": {
                            templateUrl: "views/main/templates/header.view.html"
                        },
                        "content": {
                            templateUrl: "views/main/templates/main.view.html",
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
                            templateUrl : "views/users/templates/register.view.html"
                        }
                    }
                })

                //route for login page
                .state("index.login", {
                    url:"login",
                    views: {
                        "content@": {
                            templateUrl : "views/users/templates/login.view.html"
                        }
                    }

                })

                //route for location search results page
                .state("index.location", {
                    url:"search/:location",
                    views: {
                        "content@": {
                            templateUrl : "views/location/templates/location.results.view.html",
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
                            templateUrl : "views/location/templates/location.collections.view.html",
                            controller: "locationCollectionsController",
                            controllerAs: "model"
                        }
                    }
                });

            $urlRouterProvider.otherwise("/");

        }
})();