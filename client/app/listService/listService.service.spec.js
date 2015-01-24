'use strict';

describe('Service: listService', function () {

  // load the service's module
  beforeEach(module('trelloApp'));

  // instantiate service
  var listService;
  beforeEach(inject(function (_listService_) {
    listService = _listService_;
  }));

  it('should do something', function () {
    expect(!!listService).toBe(true);
  });

});
