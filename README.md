# punto-verde

## Installation

Clone the repository and run the following command under your project root:

```shell
npm install
```
After that create an `.env` file under the project root directory and paste the following information:

```
DB_USER=
DB_PASS=
DB_HOST=
DB=
NODE_ENV=development
BLUEBIRD_WARNINGS=1
BLUEBIRD_W_FORGOTTEN_RETURN=0
```

> For development enviroment we are using [postgresql.](https://www.postgresql.org/download/)
> You will have to download and create a local db and then put your credentials on `.env` file.
> and also on the `knexfile.js` file.

On the `knexfile.js` you must change this information with your local enviroment's information.

```javascript
	development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST ||'127.0.0.1',
      database: process.env.DB ||'localDb',
      user:     process.env.DB_USER || 'localUser',
      password: process.env.DB_PASS || 'localPassword'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  },
```

Now that we have our enviroment set up we just need to run the migrations and the seeds:

> You may have to install [knexJs](http://knexjs.org/) globally.
> `npm install knex -g`

```shell
knex migrate:latest
```

```shell
knex seed:run
```

You will need to have installed [heroku cli](https://devcenter.heroku.com/articles/heroku-cli). Then just run:

```shell
heroku local
```

and the server will start on `localhost:5000`

## Testing and development

Since this is an API we can test all the features with [postman](https://www.getpostman.com/).


## Create a user

We have local auth with [JWT](https://jwt.io/). In order to get the endpoints working we need a __user token__.

First we need to make a __POST__ request to

```shell
http://localhost:5000/v1/users
```

with a `name`, `email` and `password` fields fulfilled.

After that we just make another __POST__ request to

```shell
http://localhost:5000/v1/auth/signin
```

with the same `name` and `password` values and we'll get a __TOKEN__.

After that we just set the `Authorization` header

```shell
Bearer <YOUR_TOKEN_HERE>
```

and we'll be able to acces to all endpoints.

## Endpoints

> All enpoints are under __/v1/__ prefix and are __RESTful__

```javascript
* /users
* /sectors
* /neighborhoods
* /scraps
```