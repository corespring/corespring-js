var async = require('async');
var fs = require('fs');
var assert = require('assert');
var _ = require('underscore');
_.str = require('underscore.string');

_.mixin(_.str.exports());

var corespring = {
  apiKey: null,
  url: 'https://corespring.org'
};

_(corespring).extend({
  Quiz: function() {
    return require('./quiz')(corespring.apiKey, corespring.url);
  },
  ItemSession: function() {
    return require('./item-session')(corespring.apiKey, corespring.url);
  },
  Player: function() {
    return require('./player')(corespring.apiKey, corespring.url);
  },
  Item: function(){
    return require('./item')(corespring.apiKey, corespring.url);
  }
});

module.exports = corespring;