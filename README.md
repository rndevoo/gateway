# LetsMeet Backend

## Introduction

This is the official repository of the backend of LetsMeet.

It consists of a RESTful API written in [Node.js](https://nodejs.org/en/)
and [Koa](http://koajs.com/) with features of ES2017,
a database using [PostgreSQL](https://www.postgresql.org/) and
authentication using [JSON Web Tokens](https://jwt.io/).

## Installation

### Cloning the Project

```shell
$ git clone git@github.com:strattadb/letsmeet-backend.git
```

### Installing System Requirements

#### Arch

From the Arch repositories:

```shell
$ pacman -S nodejs
$ pacman -S npm
$ pacman -S postgresql-libs
$ pacman -S postgresql
```

From the AUR:

```shell
$ pacaur -S yarn
```

#### Debian / Ubuntu / Mint

*Note: we need `node` version 7.6 or greater.*

```shell
$ curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
$ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
$ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

$ sudo apt update

$ sudo apt install nodejs
$ sudo apt install yarn
$ sudo apt install libpq-dev
$ sudo apt install postgresql
```

### Installing Node.js Requirements

```shell
$ yarn install
```

## PostgreSQL Setup

*Note:* `[user]$` *means you're in a shell as* `user`*.*

### DB Server Initialization

Before PostgreSQL can function correctly, the database cluster
must be initialized:

```shell
$ sudo su - postgres
[postgres]$ initdb --locale $LANG -E UTF8 -D '/var/lib/postgres/data'
```

[Start](https://wiki.archlinux.org/index.php/Systemd) and
[enable](https://wiki.archlinux.org/index.php/Systemd) `postgresql.service`:

```shell
$ sudo systemctl start postgresql.service
$ sudo systemctl enable postgresql.service
```

### DB Setup

Create a new user with permission to create databases:

*Create the DB user with the same name as your Linux user to access the database
without having to especify a user to login.*

```shell
$ sudo su - postgres
[postgres]$ createuser --createdb <user>
```

Create the DB:

```shell
$ createdb letsmeet
```

Create the tables:

```shell
$ psql letsmeet -f scripts/create_tables.sql
```

## Running the Server

For development:

```shell
$ npm run dev
```

For production:

```shell
$ npm run prod
```

## Project Structure

- **`docs`**: contains the documentation of the API.

- **`scripts`**: contains various useful scripts.

- **`src`**: contains the source code. The codebase is written in ES2017.

- **`test`**: contains all the tests. The unit tests are written with
[Mocha](https://mochajs.org/) and the libraries [Chai](http://chaijs.com/) and
[Sinon](http://sinonjs.org/).

## Deploying

For now I'm using Heroku to deploy.

Push the code to the Heroku repository:

```shell
$ git push heroku master
```

## Tests and Linting

Run the tests:

```shell
$ npm test
```

Lint the code:

```shell
$ npm run lint
```

## License

[GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html)
