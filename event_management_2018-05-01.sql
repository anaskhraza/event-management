# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 5.7.20)
# Database: event_management
# Generation Time: 2018-05-01 12:33:02 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table booking_items
# ------------------------------------------------------------

DROP TABLE IF EXISTS `booking_items`;

CREATE TABLE `booking_items` (
  `events_code` int(11) NOT NULL,
  `items_code` varchar(150) NOT NULL,
  `quantity_booked` int(11) NOT NULL,
  `event_date_start` date NOT NULL,
  `event_date_end` date NOT NULL,
  `selectedColor` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`events_code`,`items_code`),
  KEY `items_code` (`items_code`),
  CONSTRAINT `booking_items_ibfk_1` FOREIGN KEY (`events_code`) REFERENCES `cost_booking` (`events_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `booking_items_ibfk_2` FOREIGN KEY (`items_code`) REFERENCES `Items` (`items_code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `booking_items` WRITE;
/*!40000 ALTER TABLE `booking_items` DISABLE KEYS */;

INSERT INTO `booking_items` (`events_code`, `items_code`, `quantity_booked`, `event_date_start`, `event_date_end`, `selectedColor`)
VALUES
	(10000037,'TNT_10001',1,'2018-04-19','2018-04-20',NULL),
	(10000037,'TNT_10002',1,'2018-04-19','2018-04-20',NULL),
	(10000037,'TNT_10003',3,'2018-04-19','2018-04-20',NULL),
	(10000038,'TNT_10001',1,'2018-04-19','2018-04-20',NULL),
	(10000038,'TNT_10002',1,'2018-04-19','2018-04-20',NULL);

/*!40000 ALTER TABLE `booking_items` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table cost_booking
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cost_booking`;

CREATE TABLE `cost_booking` (
  `events_code` int(11) NOT NULL,
  `gross_amount` double NOT NULL,
  `discount_amount` double NOT NULL,
  `total_amount` double NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amount_balance` double NOT NULL,
  `recieved_amount` double NOT NULL,
  `recieved` tinyint(1) NOT NULL,
  `perHeadCost` int(11) DEFAULT NULL,
  `noOfGuests` int(11) DEFAULT NULL,
  PRIMARY KEY (`events_code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `cost_booking` WRITE;
/*!40000 ALTER TABLE `cost_booking` DISABLE KEYS */;

INSERT INTO `cost_booking` (`events_code`, `gross_amount`, `discount_amount`, `total_amount`, `date_created`, `amount_balance`, `recieved_amount`, `recieved`, `perHeadCost`, `noOfGuests`)
VALUES
	(10000037,3100,200,2900,'2018-04-05 23:27:10',2730,170,0,0,0),
	(10000038,1900,0,1900,'2018-04-05 23:30:09',0,1900,0,0,0);

/*!40000 ALTER TABLE `cost_booking` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table customer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(80) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;

INSERT INTO `customer` (`id`, `name`, `email`, `number`)
VALUES
	(1,'sknsk','knkn@knkn.com',872872872),
	(2,'fkjfjm','jdkdkn@knkn.com',278278222),
	(3,'slslm','',9090909);

/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table customer_booking
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customer_booking`;

CREATE TABLE `customer_booking` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `events_code` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `customer_booking` WRITE;
/*!40000 ALTER TABLE `customer_booking` DISABLE KEYS */;

INSERT INTO `customer_booking` (`id`, `events_code`, `customer_id`)
VALUES
	(1,10000037,1),
	(2,10000038,1);

/*!40000 ALTER TABLE `customer_booking` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table event_booking
# ------------------------------------------------------------

DROP TABLE IF EXISTS `event_booking`;

CREATE TABLE `event_booking` (
  `S.No` int(11) NOT NULL AUTO_INCREMENT,
  `events_code` int(11) NOT NULL,
  `event_name` varchar(200) NOT NULL,
  `event_date_start` date NOT NULL,
  `event_date_end` date NOT NULL,
  `booking_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `location` varchar(250) NOT NULL,
  `event_date_time` time DEFAULT NULL,
  PRIMARY KEY (`S.No`,`events_code`),
  KEY `events_code` (`events_code`),
  CONSTRAINT `event_booking_ibfk_1` FOREIGN KEY (`events_code`) REFERENCES `cost_booking` (`events_code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `event_booking` WRITE;
/*!40000 ALTER TABLE `event_booking` DISABLE KEYS */;

INSERT INTO `event_booking` (`S.No`, `events_code`, `event_name`, `event_date_start`, `event_date_end`, `booking_date`, `location`, `event_date_time`)
VALUES
	(31,10000037,'knsknk','2018-04-20','2018-04-21','2018-04-05 23:27:10','knknkn',NULL),
	(32,10000038,'knknk','2018-04-20','2018-04-21','2018-04-05 23:30:09','knknkn',NULL);

/*!40000 ALTER TABLE `event_booking` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Items
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Items`;

CREATE TABLE `Items` (
  `items_code` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL,
  `quantity` int(11) NOT NULL,
  `allow_back_order` tinyint(1) NOT NULL DEFAULT '0',
  `price` double NOT NULL,
  `package` varchar(50) DEFAULT NULL,
  `color` varchar(1000) DEFAULT NULL,
  `category` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`items_code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Items` WRITE;
/*!40000 ALTER TABLE `Items` DISABLE KEYS */;

INSERT INTO `Items` (`items_code`, `name`, `quantity`, `allow_back_order`, `price`, `package`, `color`, `category`)
VALUES
	('CH_10004','Curved Chair',12,0,123,NULL,'Green, Blue','Chair'),
	('CH_1003','Standard Chair',25,0,2332,NULL,'Red, Brown, Green, Blue','Chair'),
	('TNT_10001','Tent',20,1,700,NULL,'Blue, Green, White','Tent'),
	('TNT_10002','Banquet Style Tent',4,0,1200,NULL,'Blue, Pink, Green','Tent'),
	('TNT_10003','SImple Tent',15,0,400,NULL,NULL,NULL);

/*!40000 ALTER TABLE `Items` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table items_category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `items_category`;

CREATE TABLE `items_category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `category_name` varchar(500) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `items_category` WRITE;
/*!40000 ALTER TABLE `items_category` DISABLE KEYS */;

INSERT INTO `items_category` (`id`, `category_name`)
VALUES
	(6,''),
	(7,'Package'),
	(8,'Tent'),
	(9,'Chair'),
	(10,'Cover');

/*!40000 ALTER TABLE `items_category` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table projectedRevenue
# ------------------------------------------------------------

DROP TABLE IF EXISTS `projectedRevenue`;

CREATE TABLE `projectedRevenue` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Month` varchar(11) DEFAULT NULL,
  `Target` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
