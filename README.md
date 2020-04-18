# event-engine-ui

[![Actions Status](https://github.com/martin-schilling/event-engine-ui/workflows/Coding%20Style/badge.svg)](https://github.com/martin-schilling/event-engine-ui/actions)

## Usage
```
$ docker run --rm -it -p 3001:443 docker.pkg.github.com/martin-schilling/event-engine-ui/event-engine-ui:0.1.0
```
This project aims to be really easy to set up and use while also offering a lot of customization points. To customize 
the project to your own needs simply copy the default [ee-ui.config.js](public/ee-ui.config.js) file, adjust it to 
your needs and map it into the container:
```
$ docker run --rm -it -p 3001:443 -v $(pwd)/ee-ui.config.js:/var/www/ee-ui.config.js docker.pkg.github.com/martin-schilling/event-enginui/event-engine-ui:0.1.0
```

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
