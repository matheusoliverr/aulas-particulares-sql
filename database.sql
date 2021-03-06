CREATE DATABASE classes

CREATE TABLE teachers (
    ID SERIAL PRIMARY KEY,
    NAME TEXT NOT NULL,
    AVATAR_URL TEXT NOT NULL,
    BIRTH TIMESTAMP NOT NULL,
    EDUCATION_LEVEL TEXT NOT NULL,
    CLASS_TYPE TEXT NOT NULL,
    ACTING_AREA TEXT NOT NULL,
    CREATION_DATE TIMESTAMP NOT NULL
);

CREATE TABLE students (
    ID SERIAL PRIMARY KEY,
    NAME TEXT NOT NULL,
    AVATAR_URL TEXT NOT NULL,
    BIRTH TIMESTAMP NOT NULL,
    EMAIL TEXT NOT NULL,
    GRADE TEXT NOT NULL,
    STUDY_LOAD INT NOT NULL,
    TEACHER_ID INT NOT NULL
)
