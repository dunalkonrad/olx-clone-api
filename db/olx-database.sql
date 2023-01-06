CREATE DATABASE olx;
GRANT ALL PRIVILEGES ON DATABASE olx TO admin;

\c olx;

CREATE TABLE USERS (
                       ID_USER NUMERIC PRIMARY KEY,
                       NAME VARCHAR(255) NOT NULL,
                       SURNAME VARCHAR(255) NOT NULL,
                       PASSWORD VARCHAR(50) NOT NULL,
                       EMAIL VARCHAR(255) NOT NULL,
                       PHONE NUMERIC(20) NOT NULL
);


CREATE TABLE PROVINCE (
                          ID_PROVINCE NUMERIC PRIMARY KEY,
                          NAME VARCHAR(255) NOT NULL
);

CREATE TABLE CITY (
                      ID_CITY NUMERIC PRIMARY KEY,
                      NAME VARCHAR(255) NOT NULL
);

CREATE TABLE CATEGORY (
                          ID_CATEGORY NUMERIC PRIMARY KEY,
                          NAME VARCHAR(255) NOT NULL
);

CREATE TABLE ADVERTISEMENT (
                               ID NUMERIC PRIMARY KEY,
                               TITLE VARCHAR(255) NOT NULL,
                               DESCRIPTION VARCHAR(255),
                               PRICE FLOAT,
                               EMAIL VARCHAR(255) NOT NULL,
                               PHONE NUMERIC(20) NOT NULL,
                               ID_USER NUMERIC NOT NULL,
                               CONSTRAINT FK_ID_USER FOREIGN KEY(ID_USER) REFERENCES USERS(ID_USER),
                               ID_PROVINCE NUMERIC NOT NULL,
                               CONSTRAINT FK_ID_PROVINCE FOREIGN KEY(ID_PROVINCE) REFERENCES PROVINCE(ID_PROVINCE),
                               ID_CITY NUMERIC NOT NULL,
                               CONSTRAINT FK_ID_CITY FOREIGN KEY(ID_CITY) REFERENCES CITY(ID_CITY),
                               ID_CATEGORY NUMERIC NOT NULL,
                               CONSTRAINT FK_ID_CATEGORY FOREIGN KEY(ID_CATEGORY) REFERENCES CATEGORY(ID_CATEGORY)
);
