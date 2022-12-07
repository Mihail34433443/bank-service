# bank-service

## Job description

File with description: ./document/description.docx

## Solution description

Реализация REST API для операций по осуществлению банковский транзацкий.

## Environmental requirements

- docker

## Technologies

- Postgres
- Node.js
- NestJS
- Swagger
- Git
- NPM
- TypeScript

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
command: /bin/bash -c "npm i;npm start"
```

Run in docker

```bash
$ docker-compose build
$ docker-compose up
```

## Example of using the application

создание клиента
POST: [app-host]/clients

```json
{
  "name": "name",
  "document": "text",
  "birthDate": "02.02.2022"
}
```

создание аккаунта
POST: [app-host]/account/{:idClient}

```json
{
  "balance": "100",
  "dailyWithdrawalLimit": "1",
  "active": "true",
  "accountType": 1
}
```

## Swagger UI

[app-host]/api/docs
