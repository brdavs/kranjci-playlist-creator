/*
 * Main dirlist directive
 */
(function () {
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
        var list_url = 'http://' + $location.$$host + ':8001/media/dirlist.json';
        var playlist_url = 'http://' + $location.$$host + ':8000/playlist';

        var directive = {
            bindToController: true,
            controller: ControllerController,
            controllerAs: 'vm',
            link: link,
            templateUrl: '_dirlist.html',
            restrict: 'A',
            scope: {

            }
        };
        return directive;
        
        

        
        // link function
        function link(scope, element, attrs) {

            scope.l = function (x) { console.log(x); }

            $http.get(list_url).then(function (res) {
                scope.list = res.data;
                scope.items = scope.list.children;
            });
            
            // Getting the list and prepare it for render
            scope.get_list = function() {
                $http.get(playlist_url).then(function (res) {
                    scope.playlist = res.data.split("\n");
                });
            }
            var interval = setInterval(scope.get_list, 2000);
            
            

            // Extract name of singer and song from filename
            scope.extract = function (item) {
                item = item.slice(0, -4).split('-');
                return {
                    singer: item[1] ? item[0].trim() : 'Neznan izvajalec',
                    song: item[1] ? item[1].trim() : item[0].trim(),
                }
            }

            scope.chdir = function (item) {
                scope.current_items = item.children;
            };

            // Fill up the playlist and push it to server
            scope.select = function (item) {

                // Push or delete from playlist
                var position = scope.playlist.indexOf(item.path);
                if (position == -1) {
                    scope.playlist.push(item.path);
                } else {
                    scope.playlist.splice(position, 1);
                }

                $http.post(playlist_url, scope.playlist).then(function (res) {
                    if (res.data.response != true) scope.playlist = [];
                });

            }
        }
    }
    /* @ngInject */
    function ControllerController() {

    }
})();


/*
 * full height directive for both lists
 */