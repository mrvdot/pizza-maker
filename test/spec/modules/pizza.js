'use strict';

describe('Modules: Pizza', function () {
  var data;
  // load the module
  beforeEach(module('pizzaMaker', function ($provide) {
    data = jasmine.createSpyObj('data',[
      'get',
      'set',
      'remove',
      'uniqueId'
    ]);
    data.get.and.returnValue()
    $provide.value('data', data);
  }));

  describe('Pizza Service', function () {
    var Pizza;
    beforeEach(inject(function (_Pizza_) {
      Pizza = _Pizza_
    }));

    it('should initialize with a new id on construction', function () {
      data.uniqueId.and.returnValue("myId");
      var p = new Pizza();
      expect(data.uniqueId).toHaveBeenCalled();
      expect(p.id).toEqual("myId");
    })

    it('should load defaults if no data is provided', inject(function (pizzaDefaults) {
      var p = new Pizza()
        , prop;
      for (prop in pizzaDefaults) {
        if (!pizzaDefaults.hasOwnProperty(prop)) continue;
        var val = pizzaDefaults[prop];
        expect(p[prop]).toEqual(val);
      }
    }));

    it('should provide a dynamic label based on size and toppings', function () {
      var p = new Pizza({
        size: 'Medium'
      });
      expect(p.$dynamicLabel()).toEqual(p.size + ' pizza');
      p.toppings = ['myTopping'];
      expect(p.$dynamicLabel()).toEqual(p.size + ' pizza with ' + p.toppings[0]);

      p.toppings.push('anotherTopping');
      expect(p.$dynamicLabel()).toEqual(p.size + ' pizza with ' + p.toppings[0] + ' and ' + p.toppings[1]);
    });
  });

  describe('pizzas factory', function () {
    var pizzas
      , Pizza
      , pizzaData = {
        123: {
          id: 123,
          label: "My first pizza",
          size: "Medium"
        },
        456: {
          id: 456,
          size: "Large",
          toppings: ['Sausage', 'Pepperoni']
        }
      };

    beforeEach(inject(function(_pizzas_, _Pizza_) {
      pizzas = _pizzas_;
      Pizza = _Pizza_;
    }));

    it('should load from data on initialization', function () {
      pizzas.list();
      expect(data.get).toHaveBeenCalledWith('pizzas');
    });

    it('should return a hydrated list of pizzas', function () {
      data.get.and.returnValue(pizzaData)
      var list = pizzas.list()
        , first = list[123]
        , second = list[456];
      expect(first instanceof Pizza).toBe(true);
      expect(first.id).toBe(123);
      expect(first.label).toBe(pizzaData[123].label);

      expect(second instanceof Pizza).toBe(true);
      expect(second.toppings).toBe(pizzaData[456].toppings);
    });

    it('should add pizza to list and be returnable by id', function () {
      var p = {id: "pizza-123", label: 'test'};
      pizzas.add(p, true);
      var p2 = pizzas.get(p.id);

      expect(p).toBe(p2);
    });

    it('should save to data', function () {
      var ps = pizzas.list();
      pizzas.save();
      expect(data.set).toHaveBeenCalledWith('pizzas', ps);
    });
  });

  /*
    Note: Controllers and directives would be tested via E2E testing
    because their responsibilities are user-interaction specific.

    If for the purpose of this assessment you'd like me to write a few
    unit tests for these, just let me know and add some here.
  */
});
