(function () {
    angular
        .module('WAM')
        .controller('registerController',registerController);

    function registerController($location, userService) {

        var model = this;
        model.register = register;

        function register(username, firstName, lastName, password, password2) {

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = "Username is required";
                return;
            }

            if(firstName === null || firstName === '' || typeof firstName === 'undefined') {
                model.error = "First Name is required";
                return;
            }

            if(lastName === null || lastName === '' || typeof lastName === 'undefined') {
                model.error = "Last Name is required";
                return;
            }

            if(password === null || password ==='' || typeof password === 'undefined') {
                model.error = "Password is required";
                return;
            }

            if(password !== password2) {
                model.error = "Sorry, passwords must match";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(ifFound, ifNotFound);
            
            function ifFound() {
                model.error = "Sorry, that username is taken";
            }
            
            function ifNotFound() {
                var newUser = {
                    username : username,
                    firstName : firstName,
                    lastName : lastName,
                    password : password
                };
                return userService
                    .createUser(newUser)
                    .then(function (user) {
                        $location.url('/user/' +user._id);
                    });
            }

        }
    }
})();