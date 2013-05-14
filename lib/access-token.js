var Base = require('./base'),
  _ = require('underscore');

function AccessToken(url) {

  _.extend(this, new Base("empty_key"));

  this.create = function(id, secret, callback) {
    this.callApi({
      uri: url + "/auth/access_token",
      method: "POST",
      json: true,

      form: {
        client_id: id,
        client_secret: secret
      }
    }, function(err, data) {

      if (!data) {
        callback({
          error: "no response"
        });
        return;
      }
      callback(err, data.access_token);
    });
  };
}

module.exports = function(url) {
  return new AccessToken(url);
};