'use strict';
angular.module('KPApp', [])

.directive('dirlist', ['$location', '$http', function($location, $http) {
    
    var list_url = 'http://localhost:8000/list';
    var playlist_url = 'http://localhost:8000/playlist';

    var link = function(scope, element, attrs) {
        $http.get(list_url).then(function(res) {
            scope.playlist = [];
            scope.list = res.data;
            scope.current_path = scope.list.path;
            scope.items = scope.list.children;
            scope.current_items = scope.list.children;
        });
        
        scope.chdir = function(item) {
            scope.current_items = item.children;
            console.log(item.path)
        };
        
        scope.select = function(item) {
            scope.playlist.push(item.path);
            $http.post(playlist_url, scope.playlist).then(function(res) {
                if (res.data.response != true) scope.playlist = [];
                console.log(scope.playlist)
            });
        }
        
    }
    
    return {
        link: link,
        templateUrl: '_dirlist.html'
    }
}])