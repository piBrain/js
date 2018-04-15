## Aura's Backend

This code is used to run the server side of the aura project.

## Node
Node >= 8

## Initial Set-Up

1. yarn global add sequelize-cli
2. Install redis, on mac os simply 'brew install redis && brew services start redis'
3. Install postgresSQL >= 9.6, 'brew install psql && brew services start postgresql'
4. Make sure your yarn is at least version 1.0 and then 'yarn install' to install all the node modules

### The Following assumes you have performed the initial set-up:

## Setting up the database

From the root folder of the backend run 'NODE_ENV=local sequelize db:migrate'
Alternatively, you may run 'yarn db-init <db_url>' where the url is the local postgres url of your database
  - e.g. 'postgres://localhost/aura_be_local'

This will take care of migrating your database so that it has the most recent structure.


## Running the local server

Simply run 'yarn local'

## Checking the Redis queue for job handling

In your browser navigate to "http://localhost:4200/queue/"

This uses the default kue UI

For more information checkout **(link.)[https://github.com/Automattic/kue]**


## Testing

Tests are in the /test folder. To run all tests simply run 'yarn test'.
The directory structure mirrors the main projects folder structure.


## Style Guidelines

At the moment the project has not settled on a specific style, however,
Typically lines are kept below 120 characters, 4 spaces per indent, camelCase are generally used.
If you create classes the naming convention is CamelCase as well.

