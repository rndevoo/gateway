----------------------------------------------------------------------------
------------------------- USER PREFERENCES TABLE ---------------------------
----------------------------------------------------------------------------

DROP TABLE IF EXISTS user_preferences CASCADE;

CREATE TABLE user_preferences (
  user_id          bigint          REFERENCES users ON DELETE CASCADE UNIQUE
);
