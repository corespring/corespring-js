var Base = require('./base'),
 _ = require('underscore');

function Quiz(apiKey, url) {

  _.extend(this, new Base(apiKey));

  this.get = function (id, callback) {
    this.callApi({
      uri: url + "/api/v1/quizzes/" + id + this.token(),
      json: true
    }, callback);
  };

  this.getMultiple = function(ids,callback){
    if(!ids || ids.length === 0){
      callback(null, []);
    } else {
      this.callApi({
        uri: url + "/api/v1/quizzes/multiple/" + ids.join(',') + this.token(),
        json: true}, callback);
    }
  };

  this.create = function (quiz, callback) {
    this.callApi({
      uri: url + "/api/v1/quizzes" + this.token(),
      method: "POST",
      json: quiz
    }, callback);
  };

  this.deleteQuiz = function(id, callback){
    this.callApi({
      uri: url + "/api/v1/quizzes/" + id + this.token(),
      method: "DELETE"
    }, callback, {statusCode: 200});
  };


  this.list = function(callback){
    this.callApi({
      uri: url + "/api/v1/quizzes" + this.token(),
      json: true
    }, callback);
  };

  this.update = function(quiz, callback){
    this.callApi({
      uri: url + "/api/v1/quizzes/" + quiz.id + this.token(),
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
    this.callApi({
      uri: url + "/api/v1/quizzes/" + quizId + "/" + externalUid + "/add-answer" + this.token(),
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