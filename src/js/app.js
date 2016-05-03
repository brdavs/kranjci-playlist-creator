'use strict';

angular.module('KPApp', [])

.config(['$httpProvider', '$locationProvider', function ($httpProvider, $locationProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    // $locationProvider.html5Mode(true);
}]);

angular.element(document).ready(function() {
    angular.bootstrap(document, ['KPApp']);
});