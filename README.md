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

### Testing

Note: For testing you'll need a corespring api server that supports the client requests.

    node mock-test.js 

### Publish module

    npm publish
