var quest = require('quest');

function Base(apiKey) {

  this.valid = function(err, response) {
    return err === null && response.statusCode === 200;
  };

  this.error = function(err, response, body) {
    if (err) {
      return err;
    }
    console.log(body);
    return {
      status: response.statusCode,
      body: body
    };
  };

  this.token = function() {
    return "?access_token=" + apiKey;
  };


  /**
   * Call corespring api service
   */
  this.callApi = function(options, callback, optResponse) {
    console.log("this: " + this);

    var oThis = this;
    var onResult = function(err, response, body) {
      console.log("this: " + oThis);
      if (oThis.valid(err, response)) {
        var r = (optResponse || body);
        callback(null, r);
      } else {
        callback(oThis.error(err, response, body));
      }
    };

    quest(options, onResult);
  };

}

module.exports = Base;