"use strict";angular.module("KPApp",[]).config(["$httpProvider","$locationProvider",function(n,t){delete n.defaults.headers.common["X-Requested-With"]}]),angular.element(document).ready(function(){angular.bootstrap(document,["KPApp"])}),function(){function n(n,e){function l(n,t,l){e.get(o).then(function(t){n.playlist=[],n.list=t.data,n.current_path=n.list.path,n.items=n.list.children,n.current_items=n.list.children}),n.l=function(n){console.log(n)},n.only_name=function(n){return n.slice(0,-4)},n.chdir=function(t){n.current_items=t.children},n.select=function(t){var l=n.playlist.indexOf(t.path);-1==l?n.playlist.push(t.path):n.playlist.splice(l,1),console.log(n.playlist),e.post(i,n.playlist).then(function(t){1!=t.data.response&&(n.playlist=[])})}}var o="http://"+n.$$host+":8000/list",i="http://"+n.$$host+":8000/playlist",r={bindToController:!0,controller:t,controllerAs:"vm",link:l,templateUrl:"_dirlist.html",restrict:"C",scope:{}};return r}function t(){}angular.module("KPApp").directive("dirlist",n),n.$inject=["$location","$http"]}(),function(){function n(){function n(n,t,e){t.bind("click",function(){$(".k-list span.menu-link .folder").each(function(n){n=angular.element(n),n.removeClass("fa-folder-open-o"),n.addClass("fa-folder-o")}),$(".k-list span.menu-link .arrow").each(function(n){n=angular.element(n),n.removeClass("fa-chevron-right")});var n=t.children();angular.forEach(n,function(n){n=angular.element(n),n.hasClass("folder")&&n.addClass("fa-folder-open-o"),n.hasClass("arrow")&&n.addClass("fa-chevron-right")});var e=t.parent().find("ul").eq(0);e.hasClass("hidden")?e.removeClass("hidden"):e.addClass("hidden")})}var e={bindToController:!0,controller:t,controllerAs:"vm",link:n,restrict:"C",scope:{}};return e}function t(){}angular.module("KPApp").directive("menuLink",n),n.$inject=[]}();