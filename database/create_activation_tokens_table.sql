----------------------------------------------------------------------------
------------------------- ACTIVATION TOKENS TABLE --------------------------
----------------------------------------------------------------------------

DROP TABLE IF EXISTS activation_tokens CASCADE;

CREATE TABLE activation_tokens (
  user_id          integer         REFERENCES users ON DELETE CASCADE UNIQUE,
  token            varchar(256),
  valid_until      timestamp       DEFAULT (now() at time zone 'utc' + '3 days')
);
