<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# PGM-platform server
## Description
This is the backend for the PGM-platform, build with a
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Instal dependencies
To install the dependencies, run the following command:
```bash
$ yarn install
# or
$ npm install
```

## Set up environments
When using the local database, create a _postgres_-database with the name **pgm-platform**. Replace the username and password with your own (from the .env.dev-file) if needed.  
Create following 2 files in the root of the project:  
### `.env.dev`
```
PORT = 3000
HOST = 'localhost'
USERNAME = 'user'
PASSWORD = 'Password1'
DATABASE = 'pgm-platform'
NODE_ENV = 'dev'
```
### `.env.prod`
```
PORT = 3000
HOST = 'ec2-99-81-177-233.eu-west-1.compute.amazonaws.com'
USERNAME = 'gntqirtiiipsqx'
PASSWORD = 'ec51f1ea0bf0b344890cec03d4caec0495340021fd57b04f2ceb90370d98eb79'
DATABASE = 'd4fqu73v7m0qnj'
NODE_ENV = 'prod'
```


## Run the application _locally_
To run the application locally (with heroku-database or local), run the following commmand:
```bash
# Run with local database
$ yarn start:dev

# Run with deployed database
$ yarn start:prod
```
The GraphQL Playground will be running on:  
[http://localhost:3000/graphql](http://localhost:3000/graphql).


## Deployment
The app is deployed with [Heroku](https://www.heroku.com/). To deploy the app, run the following command (in the main-branch):
```bash
$ heroku login
$ git push heroku main:main
```
To visit the GraphQL Playground:  
[https://pgm-platform-server.herokuapp.com/graphql](https://pgm-platform-server.herokuapp.com/graphql)


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
