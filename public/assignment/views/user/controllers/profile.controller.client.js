(function () {
    angular
        .module('WAM')
        .controller('profileController',profileController);

    function profileController($location, $routeParams, userService) {

        var model = this;
        model.update = update;
        model.deleteUser = deleteUser;

        model.userId = $routeParams.userId;


        model.user = userService.findUserById(model.userId);

        function update(newUser) {
            var user = userService.updateUser(model.userId, newUser);

            if(user == null) {
                model.errorMessage = "Unable to update user";
            } else {
                model.successMessage = "User updated successfully";
            }
        }

        function deleteUser(userId) {
            userService.deleteUser(userId);
            $location.url('/login');
        }
    }
})();