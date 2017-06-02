(function () {
    angular
        .module('WAM')
        .controller('profileController',profileController);

    function profileController($location, $routeParams, userService) {

        var model = this;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        model.userId = $routeParams.userId;


        userService
            .findUserById(model.userId)
            .then(renderUser, userError);

        function renderUser(user) {
           model.user = user;
        }
        
        function userError( ) {
            model.error = "User not found"
        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
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
    }
})();