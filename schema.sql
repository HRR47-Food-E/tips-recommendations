DROP DATABASE IF EXISTS zagatTips;

CREATE DATABASE zagatTips;

-- ---
-- Globals
-- ---
USE zagatTips;
-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Restaurants'
--
-- ---

CREATE TABLE `restaurants` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `restaurant_name` VARCHAR(255) NULL DEFAULT NULL,
  `dish_name1` VARCHAR(255) NULL DEFAULT NULL,
  `dish_image1` VARCHAR(255) NULL DEFAULT NULL,
  `dish_name2` VARCHAR(255) NULL DEFAULT NULL,
  `dish_image2` VARCHAR(255) NULL DEFAULT NULL,
  `dish_name3` VARCHAR(255) NULL DEFAULT NULL,
  `dish_image3` VARCHAR(255) NULL DEFAULT NULL,
  `tip` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Articles'
--
-- ---

CREATE TABLE `articles` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `restaurant_id` INTEGER,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`restaurant_id`) REFERENCES restaurants(id) ON DELETE CASCADE
);

CREATE TABLE `features` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `restaurant_id` INTEGER,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`restaurant_id`) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- ---
-- Foreign Keys
-- ---


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Restaurants` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Articles` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Restaurants` (`id`,`dish_name1`,`dish_image1`,`dish_name2`,`dish_image2`,`dish_name3`,`dish_image3`,`tip`,`features`,`tags`) VALUES
-- ('','','','','','','','','','');
-- INSERT INTO `Articles` (`id`,`name`,`image`,`url`,`tags`) VALUES
-- ('','','','','');