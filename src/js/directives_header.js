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
            scope: {
            }
        };
        return directive;
        
        function link(scope, element, attrs) {
            
            // Search function
            scope.search = function(list, text) {
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
                return traverse(list, []).sort();
            }
            
        }
    }
    /* @ngInject */
    function ControllerController () {
        
    }
})();