"use strict";angular.module("KPApp",[]).config(["$httpProvider","$locationProvider",function(n,t){delete n.defaults.headers.common["X-Requested-With"]}]),angular.element(document).ready(function(){angular.bootstrap(document,["KPApp"])}),function(){function n(n,e){function r(n,t,r){n.l=function(n){console.log(n)},e.get(i).then(function(t){n.list=t.data,n.items=n.list.children}),n.get_list=function(){e.get(l).then(function(t){n.playlist=t.data.split("\n")})};setInterval(n.get_list,2e3);n.extract=function(n){return n=n.slice(0,-4).split("-"),{singer:n[1]?n[0].trim():"Neznan izvajalec",song:n[1]?n[1].trim():n[0].trim()}},n.chdir=function(t){n.current_items=t.children},n.select=function(t){var r=n.playlist.indexOf(t.path);-1==r?n.playlist.push(t.path):n.playlist.splice(r,1),e.post(l,n.playlist).then(function(t){1!=t.data.response&&(n.playlist=[])})}}var i="http://"+n.$$host+":8000/media/dirlist.json",l="http://"+n.$$host+":8000/playlist",o={bindToController:!0,controller:t,controllerAs:"vm",link:r,templateUrl:"_dirlist.html",restrict:"A",scope:{}};return o}function t(){}angular.module("KPApp").directive("dirlist",n),n.$inject=["$location","$http"]}(),function(){function n(){function n(n,t,e){t.bind("click",function(){$(".k-list span.menu-link .folder").each(function(n){n=angular.element(n),n.removeClass("fa-folder-open-o"),n.addClass("fa-folder-o")}),$(".k-list span.menu-link .arrow").each(function(n){n=angular.element(n),n.removeClass("fa-chevron-right")});var n=t.children();angular.forEach(n,function(n){n=angular.element(n),n.hasClass("folder")&&n.addClass("fa-folder-open-o"),n.hasClass("arrow")&&n.addClass("fa-chevron-right")});var e=t.parent().find("ul").eq(0);e.hasClass("hidden")?e.removeClass("hidden"):e.addClass("hidden")})}var e={bindToController:!0,controller:t,controllerAs:"vm",link:n,restrict:"A",scope:{}};return e}function t(){}angular.module("KPApp").directive("menuLink",n),n.$inject=[]}(),function(){function n(){function n(n,t,e){n.search=function(t,e){function r(n,t){return angular.forEach(n,function(n){n.children?r(n.children,t):t.push(n)}),t}if(n.list)var i=r(n.list.children,[]);return function(n){if(n.length<3)return!1;var t=new RegExp(n,"gi"),e=i.filter(function(n){return!!n.name.match(t)});return e.sort()}}()}var e={bindToController:!0,controller:t,controllerAs:"vm",link:n,restrict:"A"};return e}function t(){}angular.module("KPApp").directive("header",n),n.$inject=[]}();