CREATE DATABASE postbook;

CREATE extension IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE NOT NULL
);


INSERT INTO users(user_email, password, created_at, updated_at) VALUES ('thom_kaleb@yahoo.com', 'pasword123', current_timestamp, current_timestamp);

CREATE TABLE user_profile (
  user_id uuid PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  birthday DATE NOT NULL,
  bio VARCHAR(500),
  occupation VARCHAR(255),
  updated_at DATE NOT NULL,
  CONSTRAINT fk_user_id
    FOREIGN KEY(user_id)
      REFERENCES users(id)
);