(function () {
    angular
        .module('BonAppetit')
        .controller('profileController',profileController);

    function profileController(userService, $stateParams, $location, $timeout) {
        var model = this;
        model.userId = $stateParams.profileId;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        userService
            .findUserById(model.userId)
            .then(renderUser, userError);

        function renderUser(user) {
            model.user = user;
        }

        function userError() {
            model.error = "User not found";
        }

        function updateUser(user) {
            userService
                .updateUser(user, model.userId)
                .then(updateSuccess, updateError);

            function updateSuccess() {
                model.successMessage = "Profile updated successfully";
            }

            function updateError() {
                model.errorMessage = "Unable to update profile";
            }
        }

        function deleteUser() {
            userService
                .deleteUser(model.userId)
                .then(deleteSuccess, deleteError);

            function deleteSuccess() {
                model.successMessage = "Profile deleted successfully. Please wait while we're redirecting ....";
                $timeout( function() {
                    $location.url('/');
                }, 3000);
            }

            function deleteError() {
                model.errorMessage = "Unable to delete profile";
            }

        }
    }
})();