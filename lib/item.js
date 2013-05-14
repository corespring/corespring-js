var Base = require('./base'),
  _ = require('underscore');

function Item(apiKey, url) {

  _.extend(this, new Base(apiKey));

  this.get = function(queryParams, callback) {
    var uri = url + "/api/v1/items"+this.token();
    _.each(queryParams, function(value,key,list){
      uri = uri+"&"+key+"="+value
    }); 
    this.callApi({
      uri: uri,
      json: true
    }, callback);
  };

}

module.exports = function(apiKey, url) {
  return new Item(apiKey, url);
};