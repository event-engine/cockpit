# event-engine-cockpit

[![Actions Status](https://github.com/event-engine/cockpit/workflows/Coding%20Style/badge.svg)](https://github.com/event-engine/cockpit/actions)

This project is still under heavy development and it is very likely that there are quite a few bugs, many features to be
implemented and lots of sharp edges to be smoothed out. We have a lot of ideas about what features we want to implement 
next and we would also appreciate feedback from you! Therefore, if you feel like something is missing or not working as 
nicely as you would expect it to, please open an issue or create a pull request.

## Usage
To make the setup as simple as possible, we offer prebuilt Docker containers that can be ran with the following 
commands. If you do not want to use Docker or you prefer to build your own container, take a look at the installation
instructions below.
```
$ docker run --rm -it -p 3001:443 docker.pkg.github.com/event-engine/cockpit/event-engine-cockpit:0.1.0
```
This project aims to be really easy to set up and use while also offering a lot of customization points. To customize 
the project to your own needs simply copy the default [ee-cockpit.config.js](public/ee-cockpit.config.js) file, adjust it to 
your needs and map it into the container. Take a look at the [CONFIG.md](CONFIG.md) file for detailed information.
```
$ docker run --rm -it -p 3001:443 -v $(pwd)/ee-cockpit.config.js:/var/www/ee-cockpit.config.js docker.pkg.github.com/event-engine/cockpit/event-engine-cockpit:0.1.0
```

## Installation
```
$ mkdir event-engine-cockpit
$ cd event-engine-cockpit
$ git init
$ git remote add upstream https://github.com/event-engine/cockpit.git
$ git pull upstream master
$ docker-compose run --rm yarn yarn install
$ docker-compose run --rm -p 3000:3000 yarn yarn start
```

## eslint
The linter may be run with `docker-compose run --rm yarn yarn lint` or to automatically fix linting errors with `docker-compose run --rm yarn yarn lint-fix`.

