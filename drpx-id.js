/*
	The MIT License (MIT)

	Copyright (c) 2015 David Rodenas

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

	Ex: A toggle definition:
    function ToggleDirective() {
        var directive = {
            scope: {},                   // it requires an isolated scope
            controller: ToggleController // it requires a Controller
            controllerAs: 'vm',          // it requires controller as vm
        };
        return directive;
    }

    function ToggleController() {
        var opened = false;

        this.close = function() {
            opened = false;
        };
        this.isOpen = function() {
            return opened;
        };
        this.open = function() {
            opened = true;
        };
        this.toggle = function() {
            opened = !opened;
        };
    }
	
	Usage of the toggle with the directive:
    <toggle id="theToggle"></toggle>
    <button ng-click="vm.theToggle.toggle()">Toggle</button>
    <h1 ng-show="vm.theToggle.isOpen()">My Content</h1>

*/
;(function(angular) {
	'use strict';

	angular
		.module('drpxId', [])
		.directive('id', idDirective)
		;

	function idDirective() {
		var directive = {
			restrict: 'A',
			link: function (scope,element,attrs) {
				// look for current controller (converts some-thing into someThing)
				var controllerName = element[0].tagName.toLowerCase()
					.replace(/[^\w]\w/g, function(a) { return a.slice(1).toUpperCase(); });
				var elementController = element.controller(controllerName);
				// register controller into the vm
				var vm = scope.vm = scope.vm || {};
				if (elementController) {
					vm[attrs.id] = elementController;
				} else {
					// or register the element
					vm[attrs.id] = element[0];
				}
			},
		};

		return directive;
	}

})(angular);
