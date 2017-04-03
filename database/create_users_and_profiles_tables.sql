----------------------------------------------------------------------------
------------------------- USERS & PROFILES TABLES --------------------------
----------------------------------------------------------------------------

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id               serial          PRIMARY KEY,
  username         varchar(40)     NOT NULL UNIQUE,
  first_name       varchar(40)     NOT NULL,
  last_name        varchar(40)     NOT NULL,
  email            varchar(254)    NOT NULL UNIQUE,
  password         varchar(512)    NOT NULL,
  is_active        boolean         NOT NULL DEFAULT FALSE,
  is_admin         boolean         NOT NULL DEFAULT FALSE,
  created          timestamp       DEFAULT (now() at time zone 'utc')
);

DROP TABLE IF EXISTS profiles CASCADE;

CREATE TABLE profiles (
  user_id          integer         REFERENCES users ON DELETE CASCADE UNIQUE,
  bio              varchar(512),
  birth_date       timestamp,
  gender_identity  gender_identity
);
