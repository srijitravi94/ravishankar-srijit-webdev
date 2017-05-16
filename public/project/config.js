$(document).click(function(e) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768){
            $('#collapsable-nav').collapse('hide');
    }
});

(function () {
    angular
        .module('BonAppetit',['ui.router'])
        .config(configuration);

            function configuration($stateProvider, $urlRouterProvider,$locationProvider) {

            $locationProvider.hashPrefix('');

            $stateProvider

            //route for the main page
                .state('index',{
                    url:'/',
                    views: {
                        'header': {
                            templateUrl: 'views/main/header.view.html'
                        },
                        'content': {
                            templateUrl: 'views/main/main.view.html'
                        }
                    }
                })

                //route for register page
                .state('index.register', {
                    url:'register',
                    views: {
                        'content@': {
                            templateUrl : 'views/users/register.view.html'
                        }
                    }
                })

                //route for login page
                .state('index.login', {
                    url:'login',
                    views: {
                        'content@': {
                            templateUrl : 'views/users/login.view.html'
                        }
                    }
                });

            $urlRouterProvider.otherwise('/');

        }
})();