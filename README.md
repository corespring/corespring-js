# Corespring JS
A node library for interacting with the corespring api.

## Version
Alpha - work in progress

## Usage

    var corespring = require('corespring');
    corespring.apiKey = .....;
    corespring.url = "https://corespring.org";
    corespring.Quiz().list
    corespring.Quiz().deleteQuiz
    corespring.Quiz().create
    corespring.Quiz().load
    corespring.Quiz().update

## Developing

    # You'll need the quiz-api-integration branch from corespring
    git clone git@github.com:corespring/corespring-api.git
    git checkout -b quiz-api-integration origin/quiz-api-integration

### Testing

Note: For testing you'll need to run the corespring api server that supports the client requests.

    node mock-test.js 

### Publish module

    npm publish
