# ostello-backend-assignment

## PROJECT SETUP

## Local Environment Setup

- [Git](https://git-scm.com/)
- [Node.js v18.7.0](https://nodejs.org/en/)
- [NPM v8.3.0](https://www.npmjs.com/)
- [PostgreSQL v12](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
- [pgAdmin](https://www.pgadmin.org/)
- [Visual Studio Code](https://code.visualstudio.com/)

## Environment Variables for Local Development

> Create a .env file and adjust the following environment variables. DONOT include the file in the source control.

```bash
PORT=<value>
DB_HOST=<value>
DB_PASSWORD=<value>

COOKIE_SECRET=<value>
TOKEN_SECRET=<value>
USER_EMAIL=<value>
USER_PASSWORD=<value>
```

> Create a database in postgres named usermanagement

## NPM Scripts

```bash
$ npm install          # install dependencies
$ npm start            # development build
$ npm run seed         # generate required database schemas
```
