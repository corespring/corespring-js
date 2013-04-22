var Base = require('./base'),
  _ = require('underscore');

function Player(apiKey, url) {
  _.extend(this, new Base(apiKey));

  this.encryptOptions = function(options, callback) {
    this.callApi({
      uri: url + "/player/encrypt-options" + this.token(),
      method: "POST",
      json: options
    }, callback);
  };
}

module.exports = function(apiKey, url) {
  return new Player(apiKey, url);
};