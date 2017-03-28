CREATE TABLE users (
  id               bigserial    PRIMARY KEY,
  username         varchar(40)  NOT NULL UNIQUE,
  first_name       varchar(40)  NOT NULL,
  last_name        varchar(40)  NOT NULL,
  email            varchar(254) NOT NULL UNIQUE,
  password         varchar(512) NOT NULL,
  is_active        boolean      NOT NULL DEFAULT FALSE,
  is_admin         boolean      NOT NULL DEFAULT FALSE,
  created          timestamp    NOT NULL
);

CREATE TYPE gender_identities AS ENUM ();

CREATE TABLE profiles (
  user_id          bigint       REFERENCES users UNIQUE,
  bio              varchar(512),
  birth_date       timestamp,
  gender_identity  gender_identities
);

CREATE TABLE settings (
  user_id          bigint       REFERENCES users UNIQUE
)
