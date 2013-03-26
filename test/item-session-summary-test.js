var async = require('async');
var fs = require('fs');
var assert = require('assert');
var _ = require('underscore');

describe('item-session', function () {

  var corespring = null;
  var quizService = null;

  before(function () {
    corespring = require(__dirname + "/../index");
    corespring.apiKey = 'demo_token';
    corespring.url = 'http://localhost:9000';
    quizService = corespring.Quiz();
  });

  it('loads multiple', function (done) {

    var ids = ["51116cbb87eb055332a2f8e5"];
    corespring.ItemSessionSummary().getMultiple(ids, function (err, summaries) {
      assert(summaries !== null, "item sessions should not be null");
      console.log("summaries:", summaries);
      assert(err === null);
      assert(summaries.length === 1);
      done();
    });
  });
});