var async = require('async');
var fs = require('fs');
var assert = require('assert');
var _ = require('underscore');

describe('corespring', function () {

  var corespring = null;
  var itemSessionService = null;

  before(function () {
    corespring = require(__dirname + "/../index");
    corespring.apiKey = 'demo_token';
    corespring.url = 'http://localhost:9000';
    itemSessionService = corespring.ItemSession();
  });

  it('starts', function (done) {
    assert.equal(corespring.apiKey, "demo_token");
    done();
  });

  it('creates an itemSession', function (done) {
    var itemId = "511274a34924c9ca07b97042";
    var settings = {
        maxNoOfAttempts: 100
      };
    itemSessionService.create(itemId, settings, function (err, itemSession) {
      console.log(itemSession);
      if (err) {
        console.log(err);
        throw "Error: " + err;
      }
      assert(itemSession !== null, "quiz should not be null");
      assert(itemSession.settings.maxNoOfAttempts === 100, "maxNoOfAttempts should be set");
      done();
    });
  });
});


