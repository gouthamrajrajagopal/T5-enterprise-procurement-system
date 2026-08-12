CREATE DATABASE  IF NOT EXISTS `enterprise_procurement` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `enterprise_procurement`;
-- MySQL dump 10.13  Distrib 8.0.46, for macos15 (arm64)
--
-- Host: localhost    Database: enterprise_procurement
-- ------------------------------------------------------
-- Server version	9.7.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'b59eea44-76ea-11f1-9c86-0d867bd5b81d:1-2049';

--
-- Table structure for table `approval_hierarchy`
--

DROP TABLE IF EXISTS `approval_hierarchy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `approval_hierarchy` (
  `hierarchy_id` int NOT NULL AUTO_INCREMENT,
  `dept_id` int NOT NULL,
  `approval_level` int NOT NULL,
  `approver_role_id` int NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`hierarchy_id`),
  UNIQUE KEY `dept_id` (`dept_id`,`approval_level`),
  KEY `approver_role_id` (`approver_role_id`),
  CONSTRAINT `approval_hierarchy_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `departments` (`dept_id`),
  CONSTRAINT `approval_hierarchy_ibfk_2` FOREIGN KEY (`approver_role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approval_hierarchy`
--

LOCK TABLES `approval_hierarchy` WRITE;
/*!40000 ALTER TABLE `approval_hierarchy` DISABLE KEYS */;
INSERT INTO `approval_hierarchy` VALUES (2,2,1,1,'Active',NULL),(17,6,2,4,'Active',NULL);
/*!40000 ALTER TABLE `approval_hierarchy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `approval_rules`
--

DROP TABLE IF EXISTS `approval_rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `approval_rules` (
  `rule_id` int NOT NULL AUTO_INCREMENT,
  `minimum_amount` decimal(12,2) NOT NULL,
  `maximum_amount` decimal(12,2) NOT NULL,
  `approval_level` int NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`rule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approval_rules`
--

LOCK TABLES `approval_rules` WRITE;
/*!40000 ALTER TABLE `approval_rules` DISABLE KEYS */;
/*!40000 ALTER TABLE `approval_rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `approvals`
--

DROP TABLE IF EXISTS `approvals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `approvals` (
  `approval_id` int NOT NULL AUTO_INCREMENT,
  `request_id` int NOT NULL,
  `approver_id` int NOT NULL,
  `status` enum('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
  `remarks` varchar(255) DEFAULT NULL,
  `approval_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `approval_level` int DEFAULT NULL,
  `approver_role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`approval_id`),
  KEY `request_id` (`request_id`),
  KEY `approver_id` (`approver_id`),
  CONSTRAINT `approvals_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `purchase_requests` (`request_id`),
  CONSTRAINT `approvals_ibfk_2` FOREIGN KEY (`approver_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvals`
--

LOCK TABLES `approvals` WRITE;
/*!40000 ALTER TABLE `approvals` DISABLE KEYS */;
/*!40000 ALTER TABLE `approvals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_code` varchar(255) DEFAULT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `routing_department_id` int DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_name` (`category_name`),
  UNIQUE KEY `category_code` (`category_code`),
  KEY `routing_department_id` (`routing_department_id`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`routing_department_id`) REFERENCES `departments` (`dept_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (4,'CAT003','Office Stationery','Office Stationery',2,'Active',NULL,NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `dept_id` int NOT NULL AUTO_INCREMENT,
  `dept_code` varchar(255) DEFAULT NULL,
  `dept_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`dept_id`),
  UNIQUE KEY `dept_name` (`dept_name`),
  UNIQUE KEY `dept_code` (`dept_code`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (2,'IT001','Information Technology','Updated by Goutham','ACTIVE',NULL,NULL),(6,'HR001','Human Resources','Handles employees','ACTIVE',NULL,NULL),(9,'107','Test_dept','check check','Active',NULL,NULL);
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods_receipts`
--

DROP TABLE IF EXISTS `goods_receipts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goods_receipts` (
  `grn_id` int NOT NULL AUTO_INCREMENT,
  `po_id` int DEFAULT NULL,
  `received_date` datetime(6) DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `grn_number` varchar(255) NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `total_accepted_quantity` int DEFAULT NULL,
  `total_ordered_quantity` int DEFAULT NULL,
  `total_received_quantity` int DEFAULT NULL,
  `total_rejected_quantity` int DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `verification_remarks` varchar(255) DEFAULT NULL,
  `verified_date` datetime(6) DEFAULT NULL,
  `received_by_user_id` int NOT NULL,
  `supplier_id` int NOT NULL,
  `verified_by_user_id` int DEFAULT NULL,
  PRIMARY KEY (`grn_id`),
  UNIQUE KEY `UKeb2v8agd6eb7lv2kdxt9ir2vl` (`grn_number`),
  KEY `po_id` (`po_id`),
  KEY `FK8bickqyk7om73ovkqd7nxhp34` (`received_by_user_id`),
  KEY `FKwn1cuunwpj2pd38ndi4etqg6` (`supplier_id`),
  KEY `FKnbkcj2a6myc3aqi9komwx3mhj` (`verified_by_user_id`),
  CONSTRAINT `FK8bickqyk7om73ovkqd7nxhp34` FOREIGN KEY (`received_by_user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKnbkcj2a6myc3aqi9komwx3mhj` FOREIGN KEY (`verified_by_user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKwn1cuunwpj2pd38ndi4etqg6` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`),
  CONSTRAINT `goods_receipts_ibfk_1` FOREIGN KEY (`po_id`) REFERENCES `purchase_orders` (`po_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods_receipts`
--

LOCK TABLES `goods_receipts` WRITE;
/*!40000 ALTER TABLE `goods_receipts` DISABLE KEYS */;
/*!40000 ALTER TABLE `goods_receipts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `invoice_id` int NOT NULL AUTO_INCREMENT,
  `po_id` int DEFAULT NULL,
  `invoice_number` varchar(50) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `invoice_date` date DEFAULT NULL,
  PRIMARY KEY (`invoice_id`),
  KEY `po_id` (`po_id`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`po_id`) REFERENCES `purchase_orders` (`po_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_order_items`
--

DROP TABLE IF EXISTS `purchase_order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_order_items` (
  `po_item_id` int NOT NULL AUTO_INCREMENT,
  `po_id` int NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `quantity` int DEFAULT NULL,
  `item_description` varchar(255) DEFAULT NULL,
  `unit_price` decimal(38,2) NOT NULL,
  `total_price` decimal(38,2) NOT NULL,
  PRIMARY KEY (`po_item_id`),
  KEY `po_id` (`po_id`),
  CONSTRAINT `purchase_order_items_ibfk_1` FOREIGN KEY (`po_id`) REFERENCES `purchase_orders` (`po_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_order_items`
--

LOCK TABLES `purchase_order_items` WRITE;
/*!40000 ALTER TABLE `purchase_order_items` DISABLE KEYS */;
INSERT INTO `purchase_order_items` VALUES (1,2,'A4 Paper Bundle',5,'Office stationery',650.00,3250.00);
/*!40000 ALTER TABLE `purchase_order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_orders`
--

DROP TABLE IF EXISTS `purchase_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_orders` (
  `po_id` int NOT NULL AUTO_INCREMENT,
  `request_id` int DEFAULT NULL,
  `supplier_id` int DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `actual_delivery_date` date DEFAULT NULL,
  `po_number` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `total_amount` decimal(38,2) NOT NULL,
  `expected_delivery_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`po_id`),
  UNIQUE KEY `request_id` (`request_id`),
  KEY `supplier_id` (`supplier_id`),
  CONSTRAINT `purchase_orders_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `purchase_requests` (`request_id`),
  CONSTRAINT `purchase_orders_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_orders`
--

LOCK TABLES `purchase_orders` WRITE;
/*!40000 ALTER TABLE `purchase_orders` DISABLE KEYS */;
INSERT INTO `purchase_orders` VALUES (2,4,2,'2026-08-02',NULL,'PO-1785689740129','CREATED',3250.00,'2026-08-10','2026-08-02 16:55:40','2026-08-02 16:55:40'),(3,10,2,NULL,NULL,'PO-1786481535819','CREATED',150000.00,NULL,'2026-08-11 20:52:16','2026-08-11 20:52:16');
/*!40000 ALTER TABLE `purchase_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_request_items`
--

DROP TABLE IF EXISTS `purchase_request_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_request_items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `request_id` int NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  `total_price` decimal(38,2) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `unit_price` decimal(38,2) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `request_id` (`request_id`),
  CONSTRAINT `purchase_request_items_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `purchase_requests` (`request_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_request_items`
--

LOCK TABLES `purchase_request_items` WRITE;
/*!40000 ALTER TABLE `purchase_request_items` DISABLE KEYS */;
INSERT INTO `purchase_request_items` VALUES (1,4,'A4 Paper Bundle',5,3250.00,NULL,NULL,NULL,0.00,NULL),(2,5,'A4 Paper Bundle',5,3250.00,NULL,NULL,NULL,0.00,NULL),(3,6,'mouse',1,100.00,NULL,NULL,NULL,0.00,NULL),(4,7,'keyboard',1,100000.00,NULL,NULL,NULL,0.00,NULL),(5,8,'Adboeee',2,2000000.00,NULL,NULL,NULL,0.00,NULL),(6,9,'Adoben',1,1000000.00,NULL,NULL,NULL,0.00,NULL),(7,9,'Dell Laptop',5,325000.00,'2026-08-11 20:55:10.496226','Latitude 5450','ACTIVE',65000.00,'2026-08-11 20:55:10.496261');
/*!40000 ALTER TABLE `purchase_request_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_requests`
--

DROP TABLE IF EXISTS `purchase_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_requests` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `request_number` varchar(255) DEFAULT NULL,
  `purpose` varchar(255) DEFAULT NULL,
  `total_quantity` int DEFAULT NULL,
  `total_amount` decimal(38,2) DEFAULT NULL,
  `current_approval_level` int DEFAULT '1',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `selected_supplier_id` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `estimated_amount` decimal(38,2) NOT NULL,
  `quantity` int NOT NULL,
  `is_urgent` bit(1) DEFAULT NULL,
  `dept_id` int NOT NULL,
  `supplier_id` int DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  UNIQUE KEY `request_number` (`request_number`),
  KEY `user_id` (`user_id`),
  KEY `fk_purchase_request_supplier` (`selected_supplier_id`),
  KEY `FKdxtjw1yt8943w7yu3t2i689e5` (`dept_id`),
  KEY `FKl7n6c1eqhr1a1xss9a4c20aml` (`supplier_id`),
  CONSTRAINT `fk_purchase_request_supplier` FOREIGN KEY (`selected_supplier_id`) REFERENCES `suppliers` (`supplier_id`),
  CONSTRAINT `FKdxtjw1yt8943w7yu3t2i689e5` FOREIGN KEY (`dept_id`) REFERENCES `departments` (`dept_id`),
  CONSTRAINT `FKl7n6c1eqhr1a1xss9a4c20aml` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`),
  CONSTRAINT `purchase_requests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_requests`
--

LOCK TABLES `purchase_requests` WRITE;
/*!40000 ALTER TABLE `purchase_requests` DISABLE KEYS */;
INSERT INTO `purchase_requests` VALUES (4,1,'PO_GENERATED','2026-08-02 12:51:05','PR-1785675065457','Purchase office stationery',5,3250.00,0,'2026-08-11 14:21:49',2,NULL,'',0.00,0,NULL,2,NULL),(5,1,'VENDOR_SELECTION_PENDING','2026-08-02 13:43:47','PR-1785678227641','Purchase office stationery',5,3250.00,0,'2026-08-11 14:21:49',NULL,NULL,'',0.00,0,NULL,2,NULL),(6,1,'VENDOR_SELECTION_PENDING','2026-08-05 14:25:19','PR-1785939919602','Purchase of office stationery',1,100.00,0,'2026-08-11 14:21:49',NULL,NULL,'',0.00,0,NULL,2,NULL),(7,1,'PENDING_FINANCE_APPROVAL','2026-08-05 14:26:07','PR-1785939967632','Purchase of office stationery',1,100000.00,1,'2026-08-11 14:21:49',NULL,NULL,'',0.00,0,NULL,2,NULL),(8,1,'PENDING_PROCUREMENT_APPROVAL','2026-08-05 14:28:21','PR-1785940101905','Adboeee',2,2000000.00,1,'2026-08-12 13:33:46',NULL,NULL,'',0.00,0,NULL,2,NULL),(9,1,'PENDING_PROCUREMENT_APPROVAL','2026-08-05 14:32:29','PR-1785940349096','Adoben',1,1000000.00,1,'2026-08-12 13:33:52',NULL,NULL,'',0.00,0,NULL,2,NULL),(10,3,'PO_GENERATED','2026-08-11 14:42:37','PR-20260811201237',NULL,NULL,NULL,1,'2026-08-11 20:52:16',2,'2026-08-11 20:12:37.449113','Purchase Dell Laptop',150000.00,2,_binary '',2,NULL);
/*!40000 ALTER TABLE `purchase_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Manager','Department Manager','2026-07-23 06:26:38'),(2,'Procurement Manager','Procurement Head','2026-07-23 06:26:38'),(3,'Finance Manager','Finance Approval','2026-07-23 06:26:38'),(4,'ADMIN','Manages users and master data','2026-07-30 19:35:15'),(5,'OWNER','Approves high quantity requests','2026-07-30 19:35:15'),(6,'VENDOR','Receives purchase orders and updates delivery','2026-07-30 19:35:15'),(7,'EMPLOYEE','Can create purchase requests','2026-08-02 12:38:57');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier_compliance`
--

DROP TABLE IF EXISTS `supplier_compliance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier_compliance` (
  `compliance_id` int NOT NULL AUTO_INCREMENT,
  `supplier_id` int NOT NULL,
  `gst_verified` tinyint(1) DEFAULT '0',
  `pan_verified` tinyint(1) DEFAULT '0',
  `iso_certified` tinyint(1) DEFAULT '0',
  `license_expiry` date DEFAULT NULL,
  `compliance_status` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`compliance_id`),
  KEY `supplier_id` (`supplier_id`),
  CONSTRAINT `supplier_compliance_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier_compliance`
--

LOCK TABLES `supplier_compliance` WRITE;
/*!40000 ALTER TABLE `supplier_compliance` DISABLE KEYS */;
INSERT INTO `supplier_compliance` VALUES (2,3,1,0,0,'2005-12-02','Active',NULL),(4,2,1,1,1,'2027-12-31','Active',NULL);
/*!40000 ALTER TABLE `supplier_compliance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier_performance`
--

DROP TABLE IF EXISTS `supplier_performance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier_performance` (
  `performance_id` int NOT NULL AUTO_INCREMENT,
  `supplier_id` int NOT NULL,
  `quality_score` decimal(5,2) DEFAULT NULL,
  `delivery_score` decimal(5,2) DEFAULT NULL,
  `cost_score` decimal(5,2) DEFAULT NULL,
  `overall_rating` decimal(5,2) DEFAULT NULL,
  `review_date` date DEFAULT NULL,
  PRIMARY KEY (`performance_id`),
  KEY `supplier_id` (`supplier_id`),
  CONSTRAINT `supplier_performance_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier_performance`
--

LOCK TABLES `supplier_performance` WRITE;
/*!40000 ALTER TABLE `supplier_performance` DISABLE KEYS */;
/*!40000 ALTER TABLE `supplier_performance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `supplier_id` int NOT NULL AUTO_INCREMENT,
  `supplier_code` varchar(255) DEFAULT NULL,
  `supplier_name` varchar(255) DEFAULT NULL,
  `contact_person` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `gst_number` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`supplier_id`),
  UNIQUE KEY `supplier_code` (`supplier_code`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `gst_number` (`gst_number`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (2,'SUP001','ABC Electronics Pvt Ltd','Rahul Sharma','rahul@abcelectronics.com','9999999999','Bangalore','33ABCDE1234F1Z5','ACTIVE',NULL,NULL),(3,'67','tester','test','putin@gmail.com','6767676767676767','Mars','00000000112','Active',NULL,NULL),(4,'22','test','me','me@gmail.com','784578','India','333904','Active',NULL,NULL);
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `dept_id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  KEY `dept_id` (`dept_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`dept_id`) REFERENCES `departments` (`dept_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,7,2,'Goutham Raj','goutham@test.com','$2a$10$Ybv7BsA/zRwNH6WNiSnr6uyHD6W2WPKn.NHMH/W0c8t5wyXSG4DlO','9876543210','ACTIVE','2026-07-31 11:06:41','2026-08-02 12:39:17'),(2,1,2,'Goutham Raj','goutham2@test.com','$2a$10$ck9wVhOiJhkuTql6f5yGSOQ4hFD.GOw7f3qpEk.M3XOxVIVkbP5BS','9876543210','ACTIVE','2026-07-31 11:22:27','2026-07-31 11:22:27'),(3,7,2,'Authentication Test','auth.test.2026@test.com','$2a$10$hB6jGw8pYpZgz3ivRjcCqe5TmZXohjNptX6CiAY/P.TpaajAyfSv.','9999999999','ACTIVE','2026-08-10 14:13:09','2026-08-10 14:13:09'),(4,7,2,'Final Test User','finaltest1@test.com','$2a$10$kqfKZ/gAeTE2YiR1Gl.FX.T7zi3m1pwDtv9W/VK6Ld1GrOFlOFlBe','9876543210','ACTIVE','2026-08-10 14:42:11','2026-08-10 14:42:11');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-12 19:15:09
