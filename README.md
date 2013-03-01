# Corespring JS
A node library for interacting with the corespring api.

## Version
Alpha - work in progress

## Usage

    var corespring = require('corespring');
    corespring.apiKey = .....;
    corespring.url = "https://corespring.org";

    //List quizzes for this org
    corespring.Quiz().list

    //delete quiz
    corespring.Quiz().deleteQuiz(quizId,callback)

    //create a quiz
    corespring.Quiz().create(quiz,callback)

    //get a quiz
    corespring.Quiz().load(quizId,callback)

    //update a quiz
    corespring.Quiz().update(quizId,quiz,callback)

    //add an answer to a quiz for a participant (identified by the uid)
    corespring.Quiz().addAnswer(quizId,itemId,externalUid,sessionId,callback)

## Developing

    # You'll need the quiz-api-integration branch from corespring
    git clone git@github.com:corespring/corespring-api.git
    git checkout -b quiz-api-integration origin/quiz-api-integration

### Testing

Note: For testing you'll need to run the corespring api server that supports the client requests.

    node mock-test.js 

### Publish module

    npm publish
