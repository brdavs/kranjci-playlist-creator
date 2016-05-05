/*
 * Main dirlist directive
 */
(function() {
    'use strict';

    angular
        .module('KPApp')
        .directive('dirlist', Directive);

    Directive.$inject = ['$location', '$http'];
    function Directive($location, $http) {
        // Usage:
        //
        // Creates:
        //
        var list_url = 'http://'+$location.$$host+':8000/list';
        var playlist_url = 'http://'+$location.$$host+':8000/playlist';

        var directive = {
            bindToController: true,
            controller: ControllerController,
            controllerAs: 'vm',
            link: link,
            templateUrl: '_dirlist.html',
            restrict: 'C',
            scope: {
            }
        };
        return directive;
        
        function link(scope, element, attrs) {
            $http.get(list_url).then(function(res) {
                scope.playlist = [];
                scope.list = res.data;
                scope.current_path = scope.list.path;
                scope.items = scope.list.children;
                scope.current_items = scope.list.children;
            });
            
            scope.l = function(x) { console.log(x); }
            
            scope.only_name = function(item) {
                return item.slice(0, -4);
            }
            
            scope.chdir = function(item) {
                scope.current_items = item.children;
            };
            
            // Fill up the playlist and push it to server
            scope.select = function(item) {
                
                // Push or delete from playlist
                var position = scope.playlist.indexOf(item.path);
                if (position==-1) {
                    scope.playlist.push(item.path);
                } else {
                    scope.playlist.splice(position, 1);
                }
                console.log(scope.playlist)
                    
                $http.post(playlist_url, scope.playlist).then(function(res) {
                    if (res.data.response != true) scope.playlist = [];
                });
                
            }
        }
    }
    /* @ngInject */
    function ControllerController () {
        
    }
})();
