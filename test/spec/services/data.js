'use strict';

describe('Services: Data', function () {
  var mockCookies
    , _data
  // load the module
  beforeEach(module('pizzaMaker', function ($provide) {
    // Create an easily testable mock for $cookies
    mockCookies = jasmine.createSpyObj('mockCookies',[
      'get',
      'getObject',
      'put',
      'putObject',
      'remove'
    ]);
    $provide.value('$cookies', mockCookies);
  }));

  beforeEach(inject(function (data) {
    _data = data;
  }));

  it('should call getObject by default', function () {
    _data.get('myKey');
    expect(mockCookies.getObject).toHaveBeenCalledWith('myKey');
  });

  it('should call standard get if asString is true', function () {
    _data.get('myKey', true);
    expect(mockCookies.get).toHaveBeenCalledWith('myKey');
  });

  it('should call correct put depending on value type', function () {
    var obj = {}
      , str = "myString";

    _data.set('myObj', obj);
    expect(mockCookies.putObject).toHaveBeenCalledWith('myObj', obj, undefined);

    _data.set('myString', str);
    expect(mockCookies.put).toHaveBeenCalledWith('myString', str, undefined);
  });

  it('should pass through arguments to remove', function () {
    _data.remove('arg1', 'arg2');
    expect(mockCookies.remove).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should generate a unique id based on time', function () {
    jasmine.clock().mockDate(new Date()); // mock the date to prevent microsecond differences in test data
    var prefix = 'test-'
      , now = Date.now()
      , id = _data.uniqueId(prefix);

    expect(id).toEqual(prefix + now);
  });
});
