var Base = require('./base'),
  _ = require('underscore'),
  crypto = require('crypto'),
  uuid = require('node-uuid');

function Player(apiKey, url) {
  _.extend(this, new Base(apiKey));

  this.encryptOptions = function(options, callback) {
    this.callApi({
      uri: url + "/player/encrypt-options" + this.token(),
      method: "POST",
      json: options
    }, callback);
  };

  this.encryptOptionsLocal = function(options, secret, callback){
    var iv = new Array(16);
    var digest = new Array(16);

    uuid.v4(null, iv, 0);

    var hash = crypto.createHash('md5');
    hash.update(secret,'utf8');
    var digest = hash.digest('hex');

    var cipher = crypto.createCipheriv('aes-128-cbc', new Buffer(digest,'hex'), new Buffer(iv));
    var encrypted = cipher.update(JSON.stringify(options), "utf8", "hex");
    encrypted += cipher.final("hex");
    callback(null,encrypted+"--"+new Buffer(iv).toString('hex'));
  }
}

module.exports = function(apiKey, url) {
  return new Player(apiKey, url);
};