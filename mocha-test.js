/**
 * A script to allow running of mocha in the intellij debugger instead of command line
 * Just create a run configuration with this as the app script
 * You can pass in a path parameter to test files in another directory: eg:
 * mocha-test.js --path=/myfolder/test
 *
 * Note: running in intellij - if you can't get the debugger to run because it
 * can't find mocha - add the following env var to your run configuration:
 * NODE_PATH=/usr/local/lib/node_modules
 * @type {*}
 */
var Mocha = require('mocha'),
  path = require('path'),
  fs = require('fs'),
  _ = require("underscore"),
  S = require("string");

/**
 * Parse a command line arg in the format --name=value
 * @param name
 * @return {*}
 */
var parse = function (name) {
  var value = _.find(process.argv, function (arg) {
    return arg.indexOf(name) == 0
  });
  if (value) {
    return value.replace(name + "=", "");
  } else {
    return null;
  }
};

/**
 * Recursively collect files under a given path
 * @param dir
 * @param done
 */
var walk = function (dir, done) {
  var results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function (file) {
      file = dir + '/' + file;
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

var testDir = ( parse("--path") || './test/');

console.log("testDir: " + testDir);

var mocha = new Mocha({
  reporter: 'spec',
  ui: 'bdd',
  timeout: 999999,
  ignoreLeaks: true
});

walk(testDir, function (err, files) {

  var testFiles = _.filter(files, function (f) {
    return S(f).endsWith(".js");
  });

  _.forEach(testFiles, function (f) {
    mocha.addFile(f);
  });

  var runner = mocha.run(function () {
    console.log('finished');
    process.exit(0);
  });

  runner.on('pass', function (test) {
  });

  runner.on('fail', function (test) {
  });
});

