(function () {
    angular
        .module('WAM')
        .directive('wbdvSortable', wbdvSortable);

    function wbdvSortable() {
        function sort(scope, element, attributes) {
            element.sortable({axis: 'y', handle: '.handle'});
        }

        return {
            link: sort
        };
    }
})();