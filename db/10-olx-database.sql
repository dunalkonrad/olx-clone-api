CREATE DATABASE olx;
GRANT ALL PRIVILEGES ON DATABASE olx TO admin;

\c olx;

CREATE TABLE USERS
(
    ID_USER  SERIAL PRIMARY KEY,
    NAME     VARCHAR(255) NOT NULL,
    SURNAME  VARCHAR(255) NOT NULL,
    PASSWORD VARCHAR(255) NOT NULL,
    EMAIL    VARCHAR(255) NOT NULL,
    PHONE    NUMERIC(20)  NOT NULL
);


CREATE TABLE PROVINCE
(
    ID_PROVINCE SERIAL PRIMARY KEY,
    NAME        VARCHAR(255) NOT NULL
);

CREATE TABLE CITY
(
    ID_CITY SERIAL PRIMARY KEY,
    NAME    VARCHAR(255) NOT NULL
);

CREATE TABLE CATEGORY
(
    ID_CATEGORY SERIAL PRIMARY KEY,
    NAME        VARCHAR(255) NOT NULL
);

CREATE TABLE ADVERTISEMENT
(
    ID_ADVERTISEMENT SERIAL PRIMARY KEY,
    TITLE            VARCHAR(255) NOT NULL,
    PHOTO            VARCHAR,
    DESCRIPTION      VARCHAR,
    PRICE            FLOAT,
    EMAIL            VARCHAR(255) NOT NULL,
    PHONE            NUMERIC(20)  NOT NULL,
    USERNAME         VARCHAR(255) NOT NULL,
    PROVINCE         VARCHAR(255) NOT NULL,
    CITY             VARCHAR(255) NOT NULL,
    CATEGORY         VARCHAR(255) NOT NULL
);

INSERT INTO CATEGORY (NAME)
VALUES ('Motoryzacja'),
       ('Nieruchomości'),
       ('Praca'),
       ('Dom i ogród'),
       ('Elektronika'),
       ('Moda'),
       ('Rolnictwo'),
       ('Zwierzęta'),
       ('Dla dzieci');

INSERT INTO PROVINCE (NAME)
VALUES ('dolnośląskie'),
       ('kujawsko-pomorskie'),
       ('lubelskie'),
       ('lubuskie'),
       ('łódzkie'),
       ('małopolskie'),
       ('mazowieckie'),
       ('opolskie'),
       ('podkarpackie'),
       ('podlaskie'),
       ('pomorskie'),
       ('śląskie'),
       ('świętokrzyskie'),
       ('warmińsko-mazurskie'),
       ('wielkopolskie'),
       ('zachodniopomorskie');

INSERT INTO CITY (NAME)
VALUES ('Warszawa'),
       ('Szczecin'),
       ('Lublin'),
       ('Kielce'),
       ('Gdańsk'),
       ('Kraków'),
       ('Rzeszów'),
       ('Opole'),
       ('Wrocław'),
       ('Łódź'),
       ('Poznań'),
       ('Katowice'),
       ('Radom'),
       ('Tarnobrzeg'),
       ('Elbląg'),
       ('Bydgoszcz');
