angular.module('RestClientApp', [
    'app.factory.Editor',
    'app.factory.NewProjectModal',
    'app.controller.RestClientCtrl',
    'app.factory.Constants',
    'ui.bootstrap',
    'ngRoute',
    'ui.tree'
]).config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'partials/index'
        });
        $locationProvider.html5Mode(true);
    }
]);
