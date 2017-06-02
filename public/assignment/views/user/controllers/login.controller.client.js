(function () {
    angular
        .module('WAM')
        .controller('loginController',loginController);
    
    function loginController($location, userService) {

        var model = this;
        model.login = login;
        
        function login(username, password) {

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = "Username is required";
                return;
            }

            if(password === null || password ==='' || typeof password === 'undefined') {
                model.error = "Password is required";
                return;
            }

            userService
                .findUserByCredentials(username, password)
                .then(foundUser, notFound);

            function foundUser(found) {
                if(found !== null) {
                    $location.url('/user/'  +found._id);
                }
            }

            function notFound(error) {
                model.error = "Sorry " +username+ " not found or the password doesn't match. Please try again";
            }
        }
    }

})();