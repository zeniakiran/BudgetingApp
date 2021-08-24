--psql -U postgres -h localhost -W
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

CREATE TABLE expenses(
expense_id SERIAL PRIMARY KEY,
amount int,
type varchar(20),
description varchar(255)
);

CREATE TABLE groups(
group_id SERIAL PRIMARY KEY,
name varchar(20)
);
CREATE TABLE group_user(
    userId int,
    groupId int,
    CONSTRAINT fk_userid FOREIGN KEY(userId) REFERENCES users(user_id),
    CONSTRAINT fk_groupid FOREIGN KEY(groupId) REFERENCES groups(group_id)

 );
CREATE TABLE expense_user(
    user_id int,
    expense_id int,
    CONSTRAINT fk_userid FOREIGN KEY(user_id) REFERENCES users(user_id),
    CONSTRAINT fk_expenseid FOREIGN KEY(expense_id) REFERENCES expenses(expense_id)
);

ALTER TABLE  expenses ADD COLUMN group_id INTEGER;
ALTER TABLE expenses ADD CONSTRAINT fk_groupid FOREIGN KEY (group_id) REFERENCES groups(group_id);

ALTER TABLE  expenses ADD COLUMN created_by INTEGER;
ALTER TABLE expenses ADD CONSTRAINT fk_createdby FOREIGN KEY (created_by) REFERENCES user(user_id);