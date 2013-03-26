var Base = require('./base'),
  _ = require('underscore');

function ItemSession(apiKey, url) {

  _.extend(this, new Base(apiKey));

  this.getMultiple = function(ids, callback){
    if(!ids || ids.length == 0){
      callback(null, []);
    } else {
      this.callApi({
        uri: url + "/api/v1/sessions/multiple" + this.token(),
        method: 'POST',
        headers: { "Content-Type" : "application/json"},
        json: true,
        body: JSON.stringify({ ids: ids })
      }, callback);
    }
  }
}

module.exports = function (apiKey, url) {
  return new ItemSession(apiKey, url);
};