(function () {
   angular
       .module('BonAppetit')
       .factory('userService', userService);

   function userService($http) {

       var api = {
           createUser : createUser,
           findUserByUsername : findUserByUsername,
           findUserByCredentials : findUserByCredentials,
           findUserById : findUserById,
           updateUser : updateUser,
           deleteUser : deleteUser
       };

       return api;

       function createUser(newUser) {
           var url = "/api/project/user";
           return $http.post(url, newUser)
               .then(function (response) {
                   return response.data;
               })
       }

       function findUserByUsername(username) {
           var url = "/api/project/user?username=" +username;
           return $http.get(url)
               .then(function (response) {
                   return response.data;
               });
       }

       function findUserByCredentials(username, password) {
           var url = "/api/project/user?username=" +username+ "&password=" +password;
           return $http.get(url)
               .then(function (response) {
                  return response.data;
               });
       }

       function findUserById(userId) {
           var url ="/api/project/user/" +userId;
           return $http.get(url)
               .then(function (response) {
                  return response.data;
               });
       }

       function updateUser(user, userId) {
           var url = "/api/project/user/" +userId;
           return $http.put(url, user)
               .then(function (response) {
                  return response.data;
               });
       }

       function deleteUser(userId) {
           var url = "/api/project/user/" +userId;
           return $http.delete(url)
               .then(function (response) {
                  return response.data;
               });
       }
   }
})();