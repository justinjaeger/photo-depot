DROP TABLE IF EXISTS phototags
CASCADE;
DROP TABLE IF EXISTS tags
CASCADE;
DROP TABLE IF EXISTS photos
CASCADE;
DROP TABLE IF EXISTS users
CASCADE;

CREATE TABLE users
(
<<<<<<< HEAD
  "userid" serial PRIMARY KEY,
  "googleid" varchar NOT NULL,
  "name" varchar NOT NULL CHECK ( name <> '')
=======
  "id" serial PRIMARY KEY,
  "userid" varchar NOT NULL,
  "name" varchar NOT NULL CHECK ( name <> ''),
  UNIQUE ( userid )
>>>>>>> master
);

SELECT setval('users_id_seq', 1, false);

CREATE TABLE photos
(
  "photoid" serial PRIMARY KEY,
  "url" varchar NOT NULL CHECK (url <> ''),
  "userid" varchar NOT NULL,
  "date" varchar NOT NULL,
  "rating" smallint,
  UNIQUE ( url ),
  CONSTRAINT fk_user FOREIGN KEY
  ( userid ) REFERENCES users
  ( userid ) ON
  DELETE CASCADE
);

SELECT setval('photos_photoid_seq', 1, false);

CREATE TABLE tags
(
  "tagid" serial PRIMARY KEY,
  "tag" varchar NOT NULL CHECK ( tag <> ''),
  "userid" varchar NOT NULL,
  UNIQUE ( tag ),
  CONSTRAINT fk_user FOREIGN KEY ( userid ) REFERENCES users ( userid ) ON DELETE CASCADE
);

SELECT setval('tags_tagid_seq', 1, false);

CREATE TABLE phototags
(
  "userid" varchar NOT NULL,
  "photoid" bigint NOT NULL,
  "tagid" bigint NOT NULL,
  CONSTRAINT fk_photo FOREIGN KEY ( photoid ) REFERENCES photos ( photoid ) ON DELETE CASCADE,
  CONSTRAINT fk_user FOREIGN KEY ( userid ) REFERENCES users ( userid ) ON DELETE CASCADE,
  CONSTRAINT fk_tag FOREIGN KEY ( tagid ) REFERENCES tags ( tagid ) ON DELETE CASCADE
);