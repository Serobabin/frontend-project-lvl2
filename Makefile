install:
		npm ci
lint:
		npx eslint .
test:
		npm test
test-watch:
	    npx jest --watch
test-coverage:
		npm test -- --coverage --coverageProvider=v8
		
.PHONY: test