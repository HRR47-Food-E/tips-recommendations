DROP DATABASE IF EXISTS zagatTips;

CREATE DATABASE zagatTips;

CREATE TABLE "restaurants" (
  "id" SERIAL PRIMARY KEY,
  "restaurant_name" VARCHAR(50),
  "dish_name1" VARCHAR(50),
  "dish_image1" INT,
  "dish_name2" VARCHAR(50),
  "dish_image2" INT,
  "dish_name3" VARCHAR(50),
  "dish_image3" INT,
  "tip" VARCHAR(255)
);

CREATE TABLE "articles" (
  "id" SERIAL PRIMARY KEY,
  "restaurant_id" INT,
  "title" VARCHAR(50),
  "image" INT,
  FOREIGN KEY ("restaurant_id") REFERENCES restaurants("id") ON DELETE CASCADE
);

CREATE TABLE "features" (
  "id" SERIAL PRIMARY KEY,
  "restaurant_id" INT,
  "title" VARCHAR(255),
  FOREIGN KEY ("restaurant_id") REFERENCES restaurants("id") ON DELETE CASCADE
);