-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: online_school
-- ------------------------------------------------------
-- Server version	8.0.31

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

--
-- Table structure for table `account_table`
--

DROP TABLE IF EXISTS `account_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Admin','Students','Departments') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_table`
--

LOCK TABLES `account_table` WRITE;
/*!40000 ALTER TABLE `account_table` DISABLE KEYS */;
INSERT INTO `account_table` VALUES (1,'nguyena','12345','Admin'),(2,'nguyenb','1234ss5','Admin');
/*!40000 ALTER TABLE `account_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments_table`
--

DROP TABLE IF EXISTS `departments_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_id` int NOT NULL,
  `departments_name` varchar(255) NOT NULL,
  `start_day` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_id_idx` (`users_id`),
  CONSTRAINT `users_id` FOREIGN KEY (`users_id`) REFERENCES `users_table` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments_table`
--

LOCK TABLES `departments_table` WRITE;
/*!40000 ALTER TABLE `departments_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `departments_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications_table`
--

DROP TABLE IF EXISTS `notifications_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department_id` int NOT NULL,
  `subject_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `create_date` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `department_notices_idx` (`department_id`),
  KEY `subject_notices_idx` (`subject_id`),
  CONSTRAINT `department_notices` FOREIGN KEY (`department_id`) REFERENCES `departments_table` (`id`),
  CONSTRAINT `subject_notices` FOREIGN KEY (`subject_id`) REFERENCES `subject_table` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications_table`
--

LOCK TABLES `notifications_table` WRITE;
/*!40000 ALTER TABLE `notifications_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_deparment_table`
--

DROP TABLE IF EXISTS `student_deparment_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_deparment_table` (
  `department_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  KEY `department_id` (`department_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `student_deparment_table_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments_table` (`id`),
  CONSTRAINT `student_deparment_table_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students_table` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_deparment_table`
--

LOCK TABLES `student_deparment_table` WRITE;
/*!40000 ALTER TABLE `student_deparment_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_deparment_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students_table`
--

DROP TABLE IF EXISTS `students_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_id` int NOT NULL,
  `images` blob NOT NULL,
  `gender` int NOT NULL,
  `birthDay` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_id_idx` (`users_id`),
  CONSTRAINT `id_users` FOREIGN KEY (`users_id`) REFERENCES `users_table` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students_table`
--

LOCK TABLES `students_table` WRITE;
/*!40000 ALTER TABLE `students_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `students_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject_table`
--

DROP TABLE IF EXISTS `subject_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject_table`
--

LOCK TABLES `subject_table` WRITE;
/*!40000 ALTER TABLE `subject_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `subject_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_table`
--

DROP TABLE IF EXISTS `users_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` tinytext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id_idx` (`account_id`),
  CONSTRAINT `account_id` FOREIGN KEY (`account_id`) REFERENCES `account_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_table`
--

LOCK TABLES `users_table` WRITE;
/*!40000 ALTER TABLE `users_table` DISABLE KEYS */;
INSERT INTO `users_table` VALUES (1,1,'a','a','a','123456789');
/*!40000 ALTER TABLE `users_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-23 14:44:43
