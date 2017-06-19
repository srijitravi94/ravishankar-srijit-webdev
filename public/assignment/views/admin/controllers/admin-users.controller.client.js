(function () {
    angular
        .module("WAM")
        .controller('adminUsersController', adminUsersController);

    function adminUsersController(userService) {
        var model = this;
        model.deleteUser = deleteUser;
        model.createUser = createUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;
        
        function init() {
            findAllUsers();
        }
        init();

        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
                });
        }
        
        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(findAllUsers);
        }
        
        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(findAllUsers);
        }

        function selectUser(user) {
            model.user = angular.copy(user);
        }

        function createUser(user) {
            if(user.username === null || user.username === '' || typeof user.username === 'undefined') {
                return;
            }

            userService
                .createUser(user)
                .then(findAllUsers, createUserError);
        }

        function createUserError() {
            model.error = "Sorry, the username is already taken";
        }

    }
})();
