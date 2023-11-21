-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: dbautoevaluacion
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `evaluacion`
--

DROP TABLE IF EXISTS `evaluacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluacion` (
  `EVA_ID` decimal(8,0) NOT NULL,
  `LAB_ID` decimal(8,0) NOT NULL,
  `PER_ID` decimal(8,0) NOT NULL,
  `USR_IDENTIFICACION` decimal(8,0) DEFAULT NULL,
  `ROL_ID` decimal(8,0) DEFAULT NULL,
  `EVA_ESTADO` tinyint(1) DEFAULT NULL,
  `EVA_PUNTAJE` decimal(4,2) DEFAULT NULL,
  `EVA_RESULTADO` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`EVA_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluacion`
--

LOCK TABLES `evaluacion` WRITE;
/*!40000 ALTER TABLE `evaluacion` DISABLE KEYS */;
INSERT INTO `evaluacion` VALUES (10,31,1,12345678,1,0,0.00,''),(11,31,1,1234,1,0,0.00,'');
/*!40000 ALTER TABLE `evaluacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labor`
--

DROP TABLE IF EXISTS `labor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labor` (
  `LAB_ID` int NOT NULL AUTO_INCREMENT,
  `TL_ID` decimal(8,0) NOT NULL,
  `LAB_NOMBRE` varchar(50) DEFAULT NULL,
  `LAB_HORAS` decimal(8,0) DEFAULT NULL,
  PRIMARY KEY (`LAB_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labor`
--

LOCK TABLES `labor` WRITE;
/*!40000 ALTER TABLE `labor` DISABLE KEYS */;
INSERT INTO `labor` VALUES (27,1,'Teoría y Dinámica de Sistemas ',60),(28,1,'Ingeniería de Software 2',60),(31,1,'PiggyBank 2.0',60);
/*!40000 ALTER TABLE `labor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periodo`
--

DROP TABLE IF EXISTS `periodo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `periodo` (
  `PER_ID` decimal(8,0) NOT NULL,
  `PER_NOMBRE` varchar(50) DEFAULT NULL,
  `PER_FECHAINICIO` date DEFAULT NULL,
  `PER_FECHAFIN` date DEFAULT NULL,
  PRIMARY KEY (`PER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodo`
--

LOCK TABLES `periodo` WRITE;
/*!40000 ALTER TABLE `periodo` DISABLE KEYS */;
INSERT INTO `periodo` VALUES (1,'2023-02','2023-07-01','2023-12-30');
/*!40000 ALTER TABLE `periodo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `ROL_ID` decimal(8,0) NOT NULL,
  `ROL_DESCRIPCION` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ROL_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'docente'),(2,'coordinador'),(3,'decano');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipolabor`
--

DROP TABLE IF EXISTS `tipolabor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipolabor` (
  `TL_ID` decimal(8,0) NOT NULL,
  `TL_CODIGO` varchar(3) DEFAULT NULL,
  `TL_DESCRIPCION` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`TL_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipolabor`
--

LOCK TABLES `tipolabor` WRITE;
/*!40000 ALTER TABLE `tipolabor` DISABLE KEYS */;
INSERT INTO `tipolabor` VALUES (1,'D','Docencia'),(2,'TD','Trabajos Docencia'),(3,'PI','Proyectos Investigación'),(4,'TI','Trabajos Investigación'),(5,'AD','Administración'),(6,'AS','Asesoría'),(7,'S','Servicios'),(8,'E','Extensión'),(9,'C','Capacitación'),(10,'OS','Otros Servicios');
/*!40000 ALTER TABLE `tipolabor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userol`
--

DROP TABLE IF EXISTS `userol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userol` (
  `USR_IDENTIFICACION` decimal(8,0) NOT NULL,
  `ROL_ID` decimal(8,0) NOT NULL,
  PRIMARY KEY (`USR_IDENTIFICACION`,`ROL_ID`),
  KEY `FK_USEROL2` (`ROL_ID`),
  CONSTRAINT `FK_USEROL2` FOREIGN KEY (`ROL_ID`) REFERENCES `rol` (`ROL_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userol`
--

LOCK TABLES `userol` WRITE;
/*!40000 ALTER TABLE `userol` DISABLE KEYS */;
INSERT INTO `userol` VALUES (1234,1),(12345678,1),(123456,2),(1234567,3);
/*!40000 ALTER TABLE `userol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `USR_IDENTIFICACION` decimal(8,0) NOT NULL,
  `USU_NOMBRE` varchar(50) NOT NULL,
  `USU_APELLIDO` varchar(50) DEFAULT NULL,
  `USU_GENERO` varchar(1) NOT NULL,
  `USU_ESTUDIO` varchar(100) DEFAULT NULL,
  `USU_CORREO` varchar(50) NOT NULL,
  `USU_CONTRASENA` varchar(100) NOT NULL,
  `USU_NOTIFICACION` char(1) DEFAULT NULL,
  PRIMARY KEY (`USR_IDENTIFICACION`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1234,'jose','Esteban','M','Ingenieria en sistemas','jnarvaezm@unicauca.edu.co','$2a$10$WwEugH/ffs06Pf7WzUI/nOS58YjxcHerFm4gedkMA.1agwU2AC3/G',NULL),(123456,'juan','orejuela','M','Ingenieria en sistemas','jorejuelam@unicauca.edu.co','$2a$10$RF/gR/k6brO6PZqLJRmYDeNqxFtXTuWGlw189G2DVO1I5eyGa4R/e',NULL),(1234567,'carlos','garcia','M','Ingenieria en sistemas','cgarcias@unicauca.edu.co','$2a$10$5FTXnRBV.vhs8n9k921TVeFVHtOf5G.UGZDp.Ujl.2gNQ555JmJzO',NULL),(12345678,'esteban','sotelo','M','Ingenieria en sistemas','jsotelop@unicauca.edu.co','$2a$10$NIEFE3xoBPoSJoj59RXsUO9vv78rxcF5AMRxnIsN2jxN3zT8xkXLm',NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-20 15:00:44
