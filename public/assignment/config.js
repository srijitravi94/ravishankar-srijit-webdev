(function () {
    angular
        .module('WAM')
        .config(configuration);

    function configuration($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        $routeProvider
            .when('/', {
                templateUrl : 'views/home/templates/home.html',
                controller : 'homeController',
                controllerAs : 'model',
                resolve : {
                    currentUser : checkCurrentUser
                }
            })

            .when('/login', {
                templateUrl : 'views/user/templates/login.view.client.html',
                controller : 'loginController',
                controllerAs : 'model'
            })

            .when('/register', {
                templateUrl : 'views/user/templates/register.view.client.html',
                controller : 'registerController',
                controllerAs : 'model'
            })

            .when('/admin', {
                templateUrl : 'views/admin/templates/admin.view.client.html',
                resolve : {
                    currentUser : checkAdmin
                }
            })

            .when('/admin/users', {
                templateUrl : 'views/admin/templates/admin-users.view.client.html',
                controller : 'adminUsersController',
                controllerAs : 'model',
                resolve : {
                    currentUser : checkAdmin
                }
            })

            .when('/profile', {
                templateUrl : 'views/user/templates/profile.view.client.html',
                controller : 'profileController',
                controllerAs : 'model',
                resolve : {
                    currentUser : checkLoggedIn
                }
            })

            .when('/website', {
                templateUrl : 'views/website/templates/website-list.view.client.html',
                controller : 'websiteListController',
                controllerAs : 'model',
                resolve : {
                    currentUser : checkLoggedIn
                }
            })

            .when('/website/new', {
                templateUrl : 'views/website/templates/website-new.view.client.html',
                controller : 'websiteNewController',
                controllerAs : 'model',
                resolve : {
                    currentUser : checkLoggedIn
                }
            })

            .when('/website/:websiteId', {
                templateUrl : 'views/website/templates/website-edit.view.client.html',
                controller : 'websiteEditController',
                controllerAs : 'model',
                resolve : {
                    currentUser : checkLoggedIn
                }
            })

            .when('/website/:websiteId/page', {
                templateUrl : 'views/page/templates/page-list.view.client.html',
                controller : 'pageListController',
                controllerAs : 'model',
                resolve : {
                    currentUser : checkLoggedIn
                }
            })

            .when('/website/:websiteId/page/new', {
                templateUrl : 'views/page/templates/page-new.view.client.html',
                controller : 'pageNewController',
                controllerAs : 'model',
                resolve : {
                    currentUser : checkLoggedIn
                }
            })

            .when('/website/:websiteId/page/:pageId', {
                templateUrl : 'views/page/templates/page-edit.view.client.html',
                controller : 'pageEditController',
                controllerAs : 'model',
                resolve : {
                    currentUser : checkLoggedIn
                }
            })

            .when('/website/:websiteId/page/:pageId/widget', {
                templateUrl : 'views/widget/templates/widget-list.view.client.html',
                controller : 'widgetListController',
                controllerAs : 'model',
                resolve : {
                    currentUser : checkLoggedIn
                }
            })

            .when('/website/:websiteId/page/:pageId/widget/new', {
                templateUrl : 'views/widget/templates/widget-chooser.view.client.html',
                controller : 'widgetNewController',
                controllerAs : 'model',
                resolve : {
                    currentUser : checkLoggedIn
                }
            })

            .when("/website/:websiteId/page/:pageId/widget/new/:widgetType/:widgetId", {
                templateUrl: "views/widget/templates/widget-new.view.client.html",
                controller: "widgetNewController",
                controllerAs: "model",
                resolve : {
                    currentUser : checkLoggedIn
                }
            })

            .when('/website/:websiteId/page/:pageId/widget/:widgetId', {
                templateUrl : 'views/widget/templates/widget-edit.view.client.html',
                controller : 'widgetEditController',
                controllerAs : 'model',
                resolve : {
                    currentUser : checkLoggedIn
                }
            })

            .when('/website/:websiteId/page/:pageId/widget/:widgetId/search', {
                templateUrl : 'views/widget/templates/widget-flickr-search.view.client.html',
                controller : 'flickrController',
                controllerAs : 'model',
                resolve : {
                    currentUser : checkLoggedIn
                }
            })

            .otherwise({
                templateUrl : 'views/user/templates/login.view.client.html',
                controller : 'loginController',
                controllerAs : 'model'
            });

    }
    
    function checkLoggedIn($location, $q, userService) {
        var deferred = $q.defer();

        userService
            .checkLoggedIn()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(currentUser);
                }
            });

        return deferred.promise;
    }

    function checkCurrentUser($q, userService) {
        var deferred = $q.defer();

        userService
            .checkLoggedIn()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(currentUser);
                }
            });

        return deferred.promise;
    }


    function checkAdmin($location, $q, userService) {
        var deferred = $q.defer();

        userService
            .checkAdmin()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.reject();
                    $location.url('/');
                } else {
                    deferred.resolve(currentUser);
                }
            });

        return deferred.promise;
    }
})();