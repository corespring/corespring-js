.PHONY: all test clean

test-cov:
	rm -rf lib-js lib-js-cov
	jscoverage lib-js lib-js-cov
	NODE_ENV=test TEST_COV_CLEVERJS=1 node_modules/mocha/bin/mocha -R html-cov --ignore-leaks test/*.js | tee coverage.html
	open coverage.html

test:
	echo "run test.."
	NODE_ENV=test node_modules/mocha/bin/mocha --ignore-leaks test/*.js

clean:
	rm -rf lib-js lib-js-cov
