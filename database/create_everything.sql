CREATE TABLE users (
  id               bigserial       PRIMARY KEY,
  username         varchar(40)     NOT NULL UNIQUE,
  first_name       varchar(40)     NOT NULL,
  last_name        varchar(40)     NOT NULL,
  email            varchar(254)    NOT NULL UNIQUE,
  password         varchar(512)    NOT NULL,
  is_active        boolean         NOT NULL DEFAULT FALSE,
  is_admin         boolean         NOT NULL DEFAULT FALSE,
  created          timestamp       DEFAULT (now() at time zone 'utc')
);

CREATE TYPE gender_identity AS ENUM (
  'agender', 'androgyne', 'bigender', 'genderqueer', 'non-binary',
  'gender bender', 'hijra', 'pangender', 'queer heterosexuality',
  'third gender', 'trans man', 'trans woman', 'transmasculine',
  'transfemenine', 'trigender', 'two-spirit'
);

CREATE TABLE profiles (
  user_id          bigint          REFERENCES users ON DELETE CASCADE UNIQUE,
  bio              varchar(512),
  birth_date       timestamp,
  gender_identity  gender_identity
);

CREATE TABLE settings (
  user_id          bigint          REFERENCES users ON DELETE CASCADE UNIQUE
);
