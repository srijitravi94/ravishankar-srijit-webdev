(function () {
    angular
        .module('WAM')
        .controller('profileController',profileController);

    function profileController($location, $routeParams, userService) {

        var model = this;
        model.update = update;
        var userId = $routeParams.userId;

        model.userId = userId;

        model.user = userService.findUserById(userId);

        function update(newUser) {
            var user = userService.updateUser(userId, newUser);

            if(user == null) {
                model.errorMessage = "Unable to update user";
            } else {
                model.successMessage = "User updated successfully";
            }
        }
    }
})();