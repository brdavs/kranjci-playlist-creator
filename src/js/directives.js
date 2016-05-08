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
        var list_url = 'http://' + $location.$$host + ':8000/list';
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
        
        
        // Search function
        function search_list(list, text) {
            alert('asd')
            var re = new RegExp(text + "gi");
            var traverse = function (list, out) {
                angular.forEach(list.children, function(item) {
                    if (item.children) { 
                        traverse(item); 
                    } else {
                        if (item.name.match(re).length) out.push(item);
                    }
                });
                return out;
            }
            console.log( traverse(list, []).sort() );
        }
        
        // link function
        function link(scope, element, attrs) {

            scope.l = function (x) { console.log(x); }

            $http.get(list_url).then(function (res) {
                scope.list = res.data;
                scope.items = scope.list.children;
                scope.current_items = scope.list.children;
            });

            $http.get(playlist_url).then(function (res) {
                scope.playlist = res.data.split("\n");
            });

            // Extract name of singer and song from filename
            scope.extract = function (item) {
                item = item.slice(0, -4).split('-');
                return {
                    singer: item[1] ? item[0].trim() : 'Neznan izvajalec',
                    song: item[1] ? item[1].trim() : item[0].trim(),
                }
            }
            
            // Search list
            scope.search_list = function() { alert('asdsadsa');};

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
                console.log(scope.playlist)

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