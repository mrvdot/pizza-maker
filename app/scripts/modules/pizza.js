(function (angular) {
'use strict';

angular.module('pizzaMaker')
  .value('pizzaDefaults', {
      size: 'Large'
  })
  .service('Pizza', function (data, pizzaDefaults) {
    var _defaults = pizzaDefaults;

    var Pizza = function (data) {
      if (data && angular.isObject(data)) {
        this.update(data);
      } else {
        this.update(_defaults);
      }
      this.init();
      return this;
    }

    Pizza.prototype = {
      // Initialize the pizza instance
      init: function () {
        if (!this.id) {
          this.id = data.uniqueId('pizza-');
        }
        return this;
      },
      // Update pizza instance with any new data properties (passed in via object)
      update: function (data) {
        angular.extend(this, data || {});
        return this;
      },

      // Generate a label based on size and toppings
      $dynamicLabel: function () {
        var lbl = this.size + ' pizza';
        if (this.toppings && this.toppings.length) {
          lbl += ' with ';
          if (this.toppings.length > 2) {
            lbl += this.toppings.slice(0, this.toppings.length - 1).join(', ') + ', and ' + this.toppings[this.toppings.length - 1];
          } else {
            lbl += this.toppings.join(' and ');
          }
        }
        return lbl;
      },

      // Useful properties. For production, prefer to load these dynamically from API, for now just store here
      $availableToppings: [
        'Pepperoni',
        'Sausage',
        'Cheese'
      ]
    }

    return Pizza;
  })
  .factory('pizzas', function (Pizza, data) {
    var _key = 'pizzas'
      , _pizzas
      , load = function () {
        if (!_pizzas) {
          _pizzas = {};
          // Load from storage and convert to full pizza instances (from pure js objects)
          var ps = data.get(_key) || {}
            , id;
          for (id in ps) {
            if (!ps.hasOwnProperty(id)) continue;
            _pizzas[id] = new Pizza(ps[id]);
          }
        }
        return _pizzas;
      }
      , save = function () {
        if (!_pizzas) return; // Don't save if nothing has been loaded yet
        data.set(_key, _pizzas);
      }

    return {
      // Get a list of pizzas, loading if for some reason it hasn't yet
      list: function () {
        return _pizzas || load();
      },
      get: function (id) {
        if (!_pizzas) load();
        return _pizzas[id] || undefined;
      },
      add: function (pizza, skipSave) {
        if (!_pizzas) load(); // Load before adding any new pizzas
        _pizzas[pizza.id] = pizza;
        if (!skipSave) {
          save();
        }
        return this;
      },
      save: function () {
        save();
        return this;
      }
    }
  })
  .controller('PizzaListCtrl', function ($scope, pizzas, Pizza) {
    var _selectedPizza
      , clearSelected = function () {
        if (!_selectedPizza) return;
        delete _selectedPizza['$selected'];
        _selectedPizza = null;
      }

    $scope.pizzas = pizzas.list();

    $scope.createPizza = function () {
      var p = new Pizza();
      pizzas.add(p, true);
      $scope.selectPizza(p);
    }

    $scope.selectPizza = function (pizza) {
      if (_selectedPizza) {
        _selectedPizza.$selected = false;
      }
      pizza.$selected = true;
      _selectedPizza = pizza;
    }

    $scope.savePizza = function (pizza) {
      clearSelected();
      pizzas.add(pizza);
    }
  })
  .directive('pizza', function () {
    return {
      scope: {
        pizza: '=',
        onSave: '&',
        onSelect: '&'
      },
      templateUrl: 'templates/pizza.html',
      replace: true,
      link: function ($scope, $element, $attrs) {
        $scope.save = function () {
          if (angular.isFunction($scope.onSave)) {
            $scope.onSave({pizza: $scope.pizza});
          }
        }

        $scope.select = function () {
          if (angular.isFunction($scope.onSelect)) {
            $scope.onSelect({pizza: $scope.pizza});
          }
        }
      }
    }
  })
})(angular);