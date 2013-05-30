var crypto = require('crypto');
var assert = require('assert');
var quest = require('quest');

describe('player', function () {
  var player = null;
  var encrypted = null;
  var options = {
    	"itemId": "*",
    	"sessionId": "*",
    	"mode": "*",
    	"expires": "0"
	};
  var secret = "byzq4j0jpsjxmbnqk8w7wif4v";
  var clientId = "502d46ce0364068384f217a4";
  var decrypt = function(){
	var hash = crypto.createHash('md5')
	hash.update(secret,'utf8');
	var digest = hash.digest('hex');

	var parts = encrypted.split("--");
	var message = parts[0]; var iv = parts[1];
	var decipher = crypto.createDecipheriv('aes-128-cbc', new Buffer(digest,'hex'), new Buffer(iv,"hex"))
	var decrypted = decipher.update(message, "hex", "utf8")
	decrypted += decipher.final("utf8")
	return decrypted
  }
  before(function () {
    var corespring = require(__dirname + "/../index");
    corespring.apiKey = 'demo_token';
    corespring.url = 'http://localhost:9000';
    player = corespring.Player();
  });
  it('encrypts locally', function(done){
  	player.encryptOptionsLocal(options,secret,function(err,data){
  		encrypted = data;
  		assert.notEqual(encrypted.indexOf('--'), -1, "improper structure of encrypted message")
  		var decrypted = JSON.parse(decrypt())
	  	assert.equal(decrypted.itemId, options.itemId);
	  	assert.equal(decrypted.sessionId, options.sessionId);
	  	assert.equal(decrypted.mode, options.mode);
	  	assert.equal(decrypted.expires, options.expires);
  		done()
  	})
  })

  it('can use local encryption to call player', function(done){
  	var timeoutId = setTimeout(function(){encrypted = "timeout"},5000)
  	while(!encrypted);
  	clearTimeout(timeoutId);
  	assert.notEqual(encrypted,"timeout");
  	quest({
  		uri:"http://localhost:9000/player.js?apiClientId="+clientId+"&options="+encrypted,
  		timeout:5000
  	}, function(err, response, body){
  		assert.equal(err,undefined);
  		assert.equal(response.statusCode, 200)
  	});
  	done();
  })
})