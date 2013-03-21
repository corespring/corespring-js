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

  /**
   * Call corespring api service
   */
  var callApi = function(options,callback, optResponse){
    quest(options, function(err, response, body){
        if(valid(err, response)){
          var r = (optResponse || body);
          callback(null, r);
        } else {
          callback(error(err,response,body));
        }
    });
  };

  this.get = function (id, callback) {
    callApi({
      uri: url + "/api/v1/quizzes/" + id + token(),
      json: true
    }, callback);
  };

  this.getMultiple = function(ids,callback){
    if(!ids || ids === []){
      callback(null, []);
    } else {
      callApi({
        uri: url + "/api/v1/quizzes/multiple/" + ids.join(',') + token(),
        json: true}, callback);
    }
  };

  this.create = function (quiz, callback) {
    callApi({
      uri: url + "/api/v1/quizzes" + token(),
      method: "POST",
      json: quiz
    }, callback);
  };

  this.deleteQuiz = function(id, callback){
    callApi({
      uri: url + "/api/v1/quizzes/" + id + token(),
      method: "DELETE"
    }, callback, {statusCode: 200});
  };


  this.list = function(callback){
    callApi({
      uri: url + "/api/v1/quizzes" + token(),
      json: true
    }, callback);
  };

  this.update = function(quiz, callback){
    callApi({
      uri: url + "/api/v1/quizzes/" + quiz.id + token(),
      json: quiz,
      method: "PUT"
    }, callback);
  };

  /**
   * Add an answer for a participant
   * An answer is an itemId + sessionId
   * @param quizId
   * @param itemId
   * @param externalUid = the uid for the participant
   * @param sessionId
   * @param callback
   */
  this.addAnswer = function(quizId,itemId,externalUid,sessionId,callback){
    callApi({
      uri: url + "/api/v1/quizzes/" + quizId + "/" + externalUid + "/add-answer" + token(),
      method: "PUT",
      json : {
        itemId: itemId,
        sessionId:sessionId
      }
    },callback);
  };
}

module.exports = function (apiKey, url) {
  return new Quiz(apiKey, url);
};