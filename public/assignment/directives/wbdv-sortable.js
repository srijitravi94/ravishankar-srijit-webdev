(function () {
    angular
        .module('WAM')
        .directive('wbdvSortable', wbdvSortable);

    function wbdvSortable() {
        function linker(scope, element, attributes) {
            var start = -1;
            var end = -1;
            element
                .sortable({
                    start : function (event, ui) {
                        start = $(ui.item).index();
                    },
                    stop : function (event, ui) {
                        end = $(ui.item).index();
                        scope.sortableController.sort(start, end);
                    },
                    axis: 'y',
                    handle: '.handle'
                });
        }

        return {
            scope: {},
            link: linker,
            controller : sortableController,
            controllerAs : 'sortableController'
        }
    }
    
    function sortableController(widgetService, $routeParams) {
        var model = this;
        model.pageId = $routeParams.pageId;
        model.sort = sort;

        function sort(start, end) {
            widgetService
                .sortWidget(start, end, model.pageId);
        }
    }
})();
