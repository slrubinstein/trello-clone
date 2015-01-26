'use strict';

describe('Service: sortableOptions', function () {

  // load the service's module
  beforeEach(module('trelloApp'));

  // instantiate service
  var sortableOptions;
  beforeEach(inject(function (_sortableOptions_) {
    sortableOptions = _sortableOptions_;
  }));

  it('should do something', function () {
    expect(!!sortableOptions).toBe(true);
  });

});
