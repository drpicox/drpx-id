drpx-id
=================

An Angular directive to link directives together inside a template so they can be used as components. 

It leverages in [John Papa styleguide](https://github.com/johnpapa/angular-styleguide) to expose a directive controller in the current scope so it can be used.

It is the reverse of `require:` of the directive configuration, it allows parent to reference children.


Example
-------

Let's say that we have the following directive:

```javascript
    /* Toggle.component.js */
    angular
        .module('Toggle', [])
        .directive('toggle', ToggleDirective);

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
```

Now, it can be used in the template:

```html
    <!-- yourComponent.tpl.html -->
    <toggle id="theToggle"></toggle>
    <button ng-click="$.theToggle.toggle()">Toggle</button>
    <h1 ng-show="$.theToggle.isOpen()">My Content</h1>
```


Install
-------

```bash
$ bower install --save drpx-id
```

add to your module the dependence:

```javascript
    angular.module('yourModule', ['drpxId']);
```

include the javascript library in your application:

```html
<script src="bower_components/drpx-id/drpx-id.js"></script>
```


How to use
----------

Structure your component directives as follow:

- make them have an isolated scope (at least `scope: {}`),
- make them have always a controller (ex: `controller: YourController`)
- make controller be published as _vm_ (which is: `controllerAs: 'vm'`)
- optional: bind your attributes values to the controller (`ex: bindToController: true`)

Note: in short time it should be done automatically by https://github.com/angular/angular.js/issues/10007


In your template use the `id="name"` to publish the children controller (ex: YourController) at the `$scope.$.name` of the parent. Although `id` is global in html, it only affects parent directive.



Limits
------

Because of compatibility with Angular 1.2 (Angular 1.4 has better interface) it does not enable full performance optimization. You cannot disable scope debug data, see https://docs.angularjs.org/guide/production .
