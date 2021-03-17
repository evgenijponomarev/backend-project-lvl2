install:
	npm install

setup:
	npm link

run:
	gendiff __fixtures__/file1.json __fixtures__/file2.json

lint:
	npm run lint

test:
	npm run test

test-live:
	npm run test-live

test-coverage:
	npm run test-coverage
