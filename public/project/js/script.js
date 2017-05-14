$(document).click(function(e) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768){
        if (!$(e.target).is('a') && !$(e.target).is('input'))  {
            $('#collapsable-nav').collapse('hide');
        }
    }
});



angular.module('BonAppetit',['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider,$locationProvider) {

        $locationProvider.hashPrefix('');

        $stateProvider

        //route for the main page
            .state('index',{
                url:'/',
                views: {
                    'header': {
                        templateUrl: 'views/header.view.html'
                    },
                    'content': {
                        templateUrl: 'views/main.view.html'
                    }
                }
            });

        $urlRouterProvider.otherwise('/');

    });