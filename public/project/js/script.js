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
            })

        //route for register page
            .state('index.register', {
                url:'register',
                views: {
                    'content@': {
                        templateUrl : 'views/register.view.html'
                    }
                }
            })

        //route for login page
            .state('index.login', {
                url:'login',
                views: {
                    'content@': {
                        templateUrl : 'views/login.view.html'
                    }
                }
            });

        $urlRouterProvider.otherwise('/');

    });