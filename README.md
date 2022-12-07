# bank-service

## Technologies

- Postgres
- Node.js
- NestJS
- Swagger
- Git
- NPM
- TypeScript

## Installation

```bash
$ npm install
```

## Create database

```
$ CREATE DATABASE bank
```

## Create `.env` file

```
PORT=3000
POSTGRES_HOST=postgres
POSTGRES_USER=postgres
POSTGRES_DB=bank
POSTGRES_PASSWORD=1234
POSTGRES_PORT=5432

REQUEST_LIMIT=3
WHITE_HOSTS=localhost:3000 google.com
```

## Running the app

Run by npm

```bash
$ npm run start:dev
```

Run in docker

```bash
$ docker-compose build
$ docker-compose up
```

## Swagger

/api/docs
