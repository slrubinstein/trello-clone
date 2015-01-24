'use strict';

describe('Directive: userLists', function () {

  // load the directive's module and view
  beforeEach(module('trelloApp'));
  beforeEach(module('app/userLists/userLists.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<user-lists></user-lists>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the userLists directive');
  }));
});