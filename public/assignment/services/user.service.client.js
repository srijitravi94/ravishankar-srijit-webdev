(function () {
    angular
        .module('WAM')
        .factory('userService', userService);
    
    function userService($http) {

        var api = {
            createUser : createUser,
            updateUser : updateUser,
            deleteUser : deleteUser,
            findUserById : findUserById,
            findUserByCredentials : findUserByCredentials,
            findUserByUsername : findUserByUsername

        };
        return api;

        function createUser(newUser) {
            var url = "/api/assignment/user";
            return $http.post(url, newUser)
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

        function findUserById(userId) {
            var url = "/api/assignment/user/"+userId;
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

        function findUserByUsername(username) {
            var url = "/api/assignment/user?username=" +username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();