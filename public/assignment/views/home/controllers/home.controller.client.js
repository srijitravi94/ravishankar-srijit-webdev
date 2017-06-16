(function () {
    angular
        .module('WAM')
        .controller('homeController', homeController);

    function homeController(currentUser, $location, userService) {
        var model = this;
        model.currentUser = currentUser;
        model.logout = logout;

        function logout() {
            userService
                .logout()
                .then(logoutSuccess, logoutError);

            function logoutSuccess() {
                $location.url('/login');
            }

            function logoutError() {
                model.error = "Unable to logout user !!!"
            }
        }

    }
})();