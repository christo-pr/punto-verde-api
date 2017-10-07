# punto-verde

## Installation

Clone the repository and run the following command under your project root:

```shell
npm install
```
After that create an `.env` file on under the project root directory and paste the follwing information:

```
PG_CONNECTION_STRING=postgres://ksvnxvwc:07ZxD-XY6ymz-Idki-Vu5scwkYlLePYm@stampy.db.elephantsql.com:5432/ksvnxvwc
NODE_ENV=development
```

You will need to have installed [heroku cli](https://devcenter.heroku.com/articles/heroku-cli). Then just run:

```shell
heroku local
```

and the server will start on `localhost:5000`