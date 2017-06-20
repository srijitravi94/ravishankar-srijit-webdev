(function () {
    angular
        .module('WAM')
        .factory('userService', userService);
    
    function userService($http) {

        var api = {
            createUser : createUser,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            findUserById : findUserById,
            findAllUsers : findAllUsers,
            login : login,
            checkLoggedIn : checkLoggedIn,
            checkAdmin : checkAdmin,
            register : register,
            logout : logout,
            updateIndividualUser : updateIndividualUser,
            updateUser : updateUser,
            deleteUser : deleteUser,
            unregisterUser : unregisterUser
        };

        return api;

        function createUser(newUser) {
            var url = "/api/assignment/user";
            return $http.post(url, newUser)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/assignment/username?username=" +username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/assignment/user?username=" +username+ "&password=" +password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function findAllUsers() {
            var url = "/api/assignment/user";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function findUserById(userId) {
            var url = "/api/assignment/user/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/assignment/login";
            var credentials = {
                username : username,
                password : password
            };

            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function checkLoggedIn() {
            var url = "/api/assignment/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkAdmin() {
            var url = "/api/assignment/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function register(newUser) {
            var url = "/api/assignment/register";
            return $http.post(url, newUser)
                .then(function (response) {
                   return response.data;
                });
        }

        function updateIndividualUser(userId, user) {
            var url = "/api/assignment/userProfile/"+userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function unregisterUser() {
            var url = "/api/assignment/unregister";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function logout() {
            var url = "/api/assignment/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/api/assignment/user/"+userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/assignment/user/"+userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();