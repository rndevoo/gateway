----------------------------------------------------------------------------
-------------------------- GENDER IDENTITIES TYPE --------------------------
----------------------------------------------------------------------------

DROP TYPE IF EXISTS gender_identity CASCADE;

CREATE TYPE gender_identity AS ENUM (
  'agender', 'androgyne', 'bigender', 'genderqueer', 'non-binary',
  'gender bender', 'hijra', 'pangender', 'queer heterosexuality',
  'third gender', 'trans man', 'trans woman', 'transmasculine',
  'transfemenine', 'trigender', 'two-spirit'
);
