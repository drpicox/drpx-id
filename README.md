drpx-id
=================

An Angular directive to link directives together inside a template so they can be used as components. 

It leverages in [John Papa styleguide](https://github.com/johnpapa/angular-styleguide) to expose a directive controller in the current scope so it can be used.

It is the reverse of `require:` of the directive configuration, it allows parent to reference children.


Example
-------

You can reference your children directives with `id` decorator:

```html
    <!-- yourComponent.tpl.html -->
    <toggle id="theToggle"></toggle>
    <button ng-click="theToggle.toggle()">Toggle</button>
    <h1 ng-show="theToggle.isOpen()">My Content</h1>
```


The corresponding toggle directive is:

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

Structure your current directive as follows:

- make them it have a controller (ex: `controller: YourController`)
- make controller be published as _vm_ (which is: `controllerAs: 'vm'`)

Note: If you do not publish the controller as _vm_ it will create a _vm_ object in the scope.

Decorate a template element with the `id="name"` decorator to assign it to your current template directive controller.

Although `id` is global in html, it only affects parent directive.


### assign directive controller

Structure your component directives as follow:

- make them have an isolated scope (at least `scope: {}`),
- make them have always a controller (ex: `controller: YourController`)
- make controller be published as _vm_ (which is: `controllerAs: 'vm'`)
- optional: bind your attributes values to the controller (`ex: bindToController: true`)

Note: in short time it should be done automatically by https://github.com/angular/angular.js/issues/10007

In your template use the `id="name"` to publish the children controller (ex: YourController) at the current template directive controller `vm.name` of the parent.

### id at a DOM element

Your DOM element is assigned to `vm.name` (not jQlite element).


drpxId V2 Breaking changes
--------------------------

Until v1 given `id="name"` directives controllers where assigned to `$scope.$.name`, in v2 they are assigned to the current template controller `vm.name`. It is because I have detected that people gets a wrong concept, confusing with jQuery, when they see the `$` sign. Now I believe that assignign it to the current template controller it makes more sense.

Until v1 if the `id` is assigned to an non-angular directive it did nothing. Now, in v2 they are assigned. It means that it can overwrite template controller properties that were not assigned previously.


Limits
------

Because of compatibility with Angular 1.2 (Angular 1.4 has better interface) it does not enable full performance optimization. You cannot disable scope debug data, see https://docs.angularjs.org/guide/production .

Because `$parse:isecdom` ( https://docs.angularjs.org/error/$parse/isecdom )you cannot use dom element from controllers directly in your template. In such case you may use a controller function to access it. As example, the following code is not working:

```
    <!-- it does not works because $parse:isecdom security error -->
    <audio id="audio" src="http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg">
        Your browser does not support the <code>audio</code> element.
    </audio>
    <button ng-click="vm.audio.play()">Play audio</button>
```


