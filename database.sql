CREATE DATABASE budget_database;
--\l to see databases
--\c into database
--\dt to show table
CREATE TABLE users(
user_id SERIAL PRIMARY KEY,
name varchar(20),
email varchar(20),
password varchar(20)
);
