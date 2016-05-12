'use strict';

angular.module('AdminApp', [])

.config(['$httpProvider', '$locationProvider', function ($httpProvider, $locationProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    // $locationProvider.html5Mode(true);
}]);

angular.element(document).ready(function() {
    angular.bootstrap(document, ['AdminApp']);
});


(function() {
    'use strict';

    angular
        .module('AdminApp')
        .directive('admin', Directive);

    Directive.$inject = ['$http', '$location'];
    function Directive($http, $location) {
        // Usage:
        //
        // Creates:
        //
        var list_url = 'http://' + $location.$$host + ':8000/list';
        var playlist_url = 'http://' + $location.$$host + ':8000/playlist';
        
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;
        
        function link(scope, element, attrs) {
            
            // Delete playlist
            scope. delete = function() {
                $http.delete(playlist_url);
                scope.list = [];
            }
            
            // regenerate direcotry list
            scope.regenerate = function() {
                $http.get(list_url);
            }
            
            // Getting the list and prepare it for render
            scope.get_list = function() {
                return $http.get(playlist_url).then(function(data){
                    scope.list = data.data.split("\n")
                        .filter(function(item) {
                            return item.trim()!='' ? true : false;
                        })
                        .map(function(item) {
                            item = item.split('/');
                            item = item[item.length-1].split('.')[0].split("-")
                            return {
                                singer: item[1] ? item[0].trim() : '',
                                song: item[1] ? item[1].trim() : item[0]
                            }
                        });
                    console.log(scope.list);
                });
            }
            
            var interval = setInterval(scope.get_list, 1000);
            
        }
    }

})();