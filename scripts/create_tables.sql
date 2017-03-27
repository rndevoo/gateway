CREATE TABLE users (
  id              bigserial    PRIMARY KEY,
  username        varchar(40)  NOT NULL UNIQUE,
  first_name      varchar(40)  NOT NULL,
  last_name       varchar(40)  NOT NULL,
  email           varchar(254) NOT NULL UNIQUE,
  password        varchar(512) NOT NULL,
  created         timestamp    NOT NULL
);

CREATE TABLE one_on_one_meetings (
  id              bigserial    PRIMARY KEY
);
