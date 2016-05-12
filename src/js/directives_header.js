(function() {
    'use strict';

    angular
        .module('KPApp')
        .directive('header', Directive);

    Directive.$inject = [];
    function Directive() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: ControllerController,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            // scope: {
            //     'current_items': '='
            // }
        };
        return directive;
        
        function link(scope, element, attrs) {
            
            // Search closure
            scope.search = function(list, text) {
                
                // flatten out the tree
                function flatten(items, out) {
                    angular.forEach(items, function(item) {
                        item.children ? flatten(item.children, out) : out.push(item);
                    });
                    return out;
                }
                if(scope.list) var result = flatten(scope.list.children, []);
                
                // Search function
                return function (string) {
                    
                    if (string.length<3) return false;
                    
                    var re = new RegExp(string, "gi");
                    var out =  result.filter(function(item) {
                        return item.name.match(re) ? true : false;
                    });
                    return out.sort();
                }
                
            }();
            
            
        }
    }
    /* @ngInject */
    function ControllerController () {
        
    }
})();