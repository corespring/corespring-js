var Base = require('./base'),
  _ = require('underscore');

function ItemSessionSummary(apiKey, url) {

  _.extend(this, new Base(apiKey));

  this.getMultiple = function(ids, callback){
    if(!ids || ids.length == 0){
      callback(null, []);
    } else {
      this.callApi({
        uri: url + "/api/v1/session-summary" + this.token(),
        method: 'POST',
        headers: { "Content-Type" : "application/json"},
        json: true,
        body: JSON.stringify({ ids: ids })
      }, callback);
    }
  }
}

module.exports = function (apiKey, url) {
  return new ItemSessionSummary(apiKey, url);
};