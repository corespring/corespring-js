var Base = require('./base'),
  _ = require('underscore');

function ItemSession(apiKey, url) {

  _.extend(this, new Base(apiKey));

  this.create = function(itemId, settings, callback) {
    //POST    /api/v1/items/:itemId/sessions                         api.v1.ItemSessionApi.create(itemId: ObjectId)
    this.callApi({
      uri: url + "/api/v1/items/" + itemId + '/sessions' + this.token(),
      method: "POST",
      json: {
        itemId: itemId,
        settings: settings
      }
    }, callback);
  };

}

module.exports = function(apiKey, url) {
  return new ItemSession(apiKey, url);
};