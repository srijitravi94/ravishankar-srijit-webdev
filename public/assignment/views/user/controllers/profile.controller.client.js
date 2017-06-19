(function () {
    angular
        .module('WAM')
        .controller('profileController',profileController);

    function profileController($location, userService, currentUser) {

        var model = this;
        model.updateIndividualUser = updateIndividualUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.unregisterUser = unregisterUser;

        model.userId = currentUser._id;

        function init() {
            renderUser(currentUser);
        }
        init();


        userService
            .findUserById(model.userId)
            .then(renderUser, userError);

        function renderUser(user) {
           model.user = user;
        }
        
        function userError( ) {
            model.error = "User not found"
        }

        function updateIndividualUser(user) {
            userService
                .updateIndividualUser(user._id, user)
                .then(successMessage, errorMessage);

            function successMessage() {
                model.successMessage = "User updated successfully";
            }

            function errorMessage() {
                model.errorMessage = "Unable to update user";
            }
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(deleteSuccess, deleteError);

            function deleteSuccess() {
                $location.url('/login');
            }

            function deleteError() {
                model.deleteError = "Unable to delete the user";
            }

        }

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

        function unregisterUser() {
            userService
                .unregisterUser()
                .then(unregisterSuccess, unregisterError);
        }

        function unregisterSuccess() {
            $location.url('/login');
        }

        function unregisterError() {
            model.deleteError = "Unable to delete the user";
        }

    }
})();