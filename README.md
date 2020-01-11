# event-engine-ui

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