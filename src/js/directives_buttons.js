/*
 * Main menu directory button
 */
(function() {
    'use strict';

    angular
        .module('KPApp')
        .directive('menuLink', Directive);

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

            element.bind('click', function() {
                // reset all active menu items
                $('.k-list span.menu-link .folder').each(function(el) {
                    el = angular.element(el);
                    el.removeClass('fa-folder-open-o');
                    el.addClass('fa-folder-o');
                });
                // reset all arrows
                $('.k-list span.menu-link .arrow').each(function(el) {
                    el = angular.element(el);
                    el.removeClass('fa-chevron-right');
                });
                // Get this particular button in shape
                var children = element.children();
                angular.forEach(children, function(el) {
                    el = angular.element(el);
                    if (el.hasClass('folder')) el.addClass('fa-folder-open-o');
                    if (el.hasClass('arrow')) el.addClass('fa-chevron-right');
                });
                // Make submenu visible or invisible
                var submenu = element.parent().find('ul').eq(0);
                submenu.hasClass('hidden') ? submenu.removeClass('hidden') : submenu.addClass('hidden');
            });
            
        }
    }
    /* @ngInject */
    function ControllerController () {
        
    }
})();
