# event-engine-ui

[![Actions Status](https://github.com/martin-schilling/event-engine-ui/workflows/Coding%Style/badge.svg)](https://github.com/martin-schilling/event-engine-ui/actions)

## Installation
```
$ mkdir event-engine-ui
$ cd event-engine-ui
$ git init
$ git remote add upstream https://github.com/martin-schilling/event-engine-ui.git
$ git pull upstream master
$ docker-compose run --rm yarn yarn install
$ docker-compose run --rm -p 3000:3000 yarn yarn start
```


## tslint
The linter may be run with `docker-compose run --rm yarn yarn lint` or to automatically fix linting errors with `docker-compose run --rm yarn yarn lint-fix`.