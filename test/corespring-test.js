var async = require('async');
var fs = require('fs');
var assert = require('assert');
var _ = require('underscore');

describe('corespring', function () {

  var corespring = null;
  var quizService = null;

  before(function () {
    corespring = require(__dirname + "/../index");
    corespring.apiKey = 'demo_token';
    corespring.url = 'http://localhost:9000';
    quizService = corespring.Quiz();
  });

  it('starts', function (done) {
    assert.equal(corespring.apiKey, "demo_token");
    done();
  });

  it('loads a quiz', function (done) {
    quizService.get("000000000000000000000001", function (err, quiz) {
      if (err) {
        console.log(err);
        throw "Error: " + err;
      }
      assert(quiz !== null, "quiz should not be null");
      done();
    });
  });

  function quizMe(timestamp) {
    return {
      metadata: {
        title: "my quiz",
        course: "my course",
        timestamp: timestamp
      },
      questions: [
        {
          itemId: "50083ba9e4b071cb5ef79101"
        }
      ],
      participants: [
        {
          itemSessions: ["50aa12143004e43e523374e8"],
          externalUid: "hello",
          metadata: {studentName: "Joe Schmidt"}
        }
      ]
    };
  }

  it('creates a quiz', function (done) {

    var quiz = quizMe(new Date().getTime().toString());

    quizService.create(quiz, function (err, savedQuiz) {

      if (err) {
        console.log(err);
        throw err;
      }
      assert(savedQuiz !== null, "Quiz should not be null");
      assert(savedQuiz.metadata.timestamp === quiz.metadata.timestamp);
      console.log(quiz);
      done();
    });
  });

  function handle(fn) {
    return function (err, data) {
      if (err) {
        console.log("Error: " + err);
        throw err;
      }
      fn(data);
    };
  }

  it('deletes a quiz', function (done) {
    var quiz = quizMe(new Date().getTime().toString());
    quizService.create(quiz, handle(function (savedQuiz) {
      console.log("Newly saved quiz: %j", savedQuiz);
      corespring.Quiz().deleteQuiz(savedQuiz.id, handle(function (response) {
        assert(response.statusCode === 200);
        done();
      }));
    }));
  });

  it('lists quizzes', function (done) {
    quizService.list(handle(function (quizzes) {
      console.log("\n");
      console.log("%j", quizzes);
      assert(quizzes !== null);
      done();
    }));
  });

  it('updates quizzes', function (done) {
    var quiz = quizMe(new Date().getTime().toString());
    quizService.create(quiz, handle(function (savedQuiz) {
      console.log("old timestamp: " + savedQuiz.metadata.timestamp);
      savedQuiz.metadata.timestamp = new Date().getTime().toString();
      console.log("new timestamp: " + savedQuiz.metadata.timestamp);
      quizService.update(savedQuiz, handle(function (updatedQuiz) {
        assert(updatedQuiz !== null);
        assert(updatedQuiz.metadata.timestamp == savedQuiz.metadata.timestamp);
        done();
      }));
    }));
  });
});


