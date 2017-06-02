(function () {
    angular
        .module('WAM')
        .factory('userService', userService);
    
    function userService($http) {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@gmail.com"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@gmail.com"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@gmail.com"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jannunzi@gmail.com" }
        ];

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