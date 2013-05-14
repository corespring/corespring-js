var async = require('async');
var fs = require('fs');
var assert = require('assert');
var _ = require('underscore');

describe('corespring', function() {

  var corespring = null;
  var tokenService = null;
  var id = "502d46ce0364068384f217a5";
  var secret = "byzq4j0jpsjxmbnqk8w7wif4v";

  before(function() {
    corespring = require(__dirname + "/../index");
    corespring.apiKey = 'demo_token';
    corespring.url = 'http://localhost:9000';
    tokenService = corespring.AccessToken();
  });

  it('starts', function(done) {
    assert.equal(corespring.apiKey, "demo_token");
    done();
  });

  it('creates an access token', function(done) {
    tokenService.create(id, secret, function(err, token) {
      console.log(" ----------> " + token);
      if (err) {
        console.log(err);
        throw "Error: " + err;
      }
      assert(token !== null, "quiz should not be null");
      done();
    });
  });
});