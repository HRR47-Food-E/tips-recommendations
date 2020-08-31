DROP DATABASE IF EXISTS zagattips;

CREATE DATABASE zagattips;

DROP TABLE IF EXISTS "restaurants" cascade;
DROP TABLE IF EXISTS "articles";
DROP TABLE IF EXISTS "features";

CREATE TABLE "restaurants" (
  id SERIAL PRIMARY KEY,
  restaurant_name VARCHAR(50),
  dish_name1 VARCHAR(50),
  dish_image1 INT,
  dish_name2 VARCHAR(50),
  dish_image2 INT,
  dish_name3 VARCHAR(50),
  dish_image3 INT,
  tip VARCHAR(255)
);

CREATE TABLE "articles" (
  restaurant_id INT,
  title VARCHAR(255),
  image INT,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

CREATE TABLE "features" (
  restaurant_id INT,
  title VARCHAR(255),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

CREATE INDEX article_idx ON articles (restaurant_id);
CREATE INDEX feature_idx ON features (restaurant_id);