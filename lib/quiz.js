var quest = require("quest");

function Quiz(apiKey, url) {

  var valid = function (err, response) {
    return err === null && response.statusCode === 200;
  };

  var error = function (err, response, body) {
    if (err) {
      return err;
    }
    console.log(body);
    return { status: response.statusCode, body: body};
  };

  var token = function () {
    return "?access_token=" + apiKey;
  };

  this.load = function (id, callback) {

    var loadUrl = url + "/api/v1/quizzes/" + id + token();

    var options = {
      uri: loadUrl,
      json: true
    };
    quest(options, function (err, response, body) {
      if (valid(err, response)) {
        callback(null, body);
      } else {
        callback(error(err, response, body));
      }
    });
  };

  this.create = function (quiz, callback) {
    var createUrl = url + "/api/v1/quizzes" + token();
    var options = {
      uri: createUrl,
      method: "POST",
      json: quiz
    };
    quest(options, function (err, response, body) {
      if (valid(err, response)) {
        callback(null, body);
      }
      else {
        callback(error(err, response, body));
      }
    });
  };

  this.deleteQuiz = function(id, callback){
    var deleteUrl = url + "/api/v1/quizzes/" + id + token();
    var options = {
      uri: deleteUrl,
      method: "DELETE"
    };
    quest(options, function(err, response, body){
       if(valid(err, response)){
         callback(null, {statusCode: 200});
       } else {
         callback(error(err,response,body));
       }
    });
  };

  this.list = function(callback){
    var listUrl = url + "/api/v1/quizzes" + token();
    var options = {
      uri: listUrl,
      json: true
    };
    quest(options, function(err, response, body){
        if(valid(err, response)){
          callback(null, body);
        } else {
          callback(error(err,response,body));
        }
    });
  };
}

module.exports = function (apiKey, url) {
  return new Quiz(apiKey, url);
};