-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_gites
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
-- Table structure for table `commentaire`
--

DROP TABLE IF EXISTS `commentaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentaire` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` int DEFAULT NULL,
  `date_redaction` datetime DEFAULT NULL,
  `Gite_id` int NOT NULL,
  `Redac_locataire_id` int DEFAULT NULL,
  `Redac_proprietaire_id` int DEFAULT NULL,
  `Destinataire_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Commentaire_Gite1_idx` (`Gite_id`),
  KEY `fk_Commentaire_Utilisateur1_idx` (`Redac_locataire_id`),
  KEY `fk_Commentaire_Utilisateur2_idx` (`Redac_proprietaire_id`),
  KEY `fk_Commentaire_Utilisateur3_idx` (`Destinataire_id`),
  CONSTRAINT `fk_Commentaire_Gite1` FOREIGN KEY (`Gite_id`) REFERENCES `gite` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Commentaire_Utilisateur1` FOREIGN KEY (`Redac_locataire_id`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Commentaire_Utilisateur2` FOREIGN KEY (`Redac_proprietaire_id`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Commentaire_Utilisateur3` FOREIGN KEY (`Destinataire_id`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentaire`
--

LOCK TABLES `commentaire` WRITE;
/*!40000 ALTER TABLE `commentaire` DISABLE KEYS */;
/*!40000 ALTER TABLE `commentaire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gite`
--

DROP TABLE IF EXISTS `gite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gite` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `superficie` int DEFAULT NULL,
  `prix` float DEFAULT NULL,
  `note` int DEFAULT NULL,
  `Localisation_id` int NOT NULL,
  `Gite_equipement_id` int NOT NULL,
  `Proprietaire_id` int NOT NULL,
  `gite_accessibilite_idGite_accessibilite` int NOT NULL,
  `langue_id` int NOT NULL,
  `utilisateur_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Gite_Localisation1_idx` (`Localisation_id`),
  KEY `fk_Gite_Gite_equipement1_idx` (`Gite_equipement_id`),
  KEY `fk_Gite_Proprietaire1_idx` (`Proprietaire_id`),
  KEY `fk_gite_gite_accessibilite1_idx2` (`gite_accessibilite_idGite_accessibilite`),
  KEY `fk_gite_langue1_idx` (`langue_id`),
  KEY `fk_utilisateur_id_idx` (`utilisateur_id`),
  CONSTRAINT `fk_gite_gite_accessibilite1` FOREIGN KEY (`gite_accessibilite_idGite_accessibilite`) REFERENCES `gite_accessibilite` (`idGite_accessibilite`),
  CONSTRAINT `fk_Gite_Gite_equipement1` FOREIGN KEY (`Gite_equipement_id`) REFERENCES `gite_equipement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_gite_langue1` FOREIGN KEY (`langue_id`) REFERENCES `langue` (`id`),
  CONSTRAINT `fk_Gite_Localisation1` FOREIGN KEY (`Localisation_id`) REFERENCES `localisation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Gite_Proprietaire1` FOREIGN KEY (`Proprietaire_id`) REFERENCES `proprietaire` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_utilisateur_id` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gite`
--

LOCK TABLES `gite` WRITE;
/*!40000 ALTER TABLE `gite` DISABLE KEYS */;
INSERT INTO `gite` VALUES (1,'La Tuilerie','Descriptif 2023, susceptible de modifications pour 2024, merci de vous référer à la fiche descriptive validée lors de la réservation.\n\nSur une propriété non clôturée de 2000 m², maison indépendante de 41m² à proximité d\'une autre location. Elle est composée ainsi :\n- Séjour/cuisine\n- 1 chambre comprenant 1 lit 160x200 cm\n- Salle d\'eau/WC privative à la chambre',38,30,NULL,2,28,1,28,28,1);
/*!40000 ALTER TABLE `gite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gite_accessibilite`
--

DROP TABLE IF EXISTS `gite_accessibilite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gite_accessibilite` (
  `idGite_accessibilite` int NOT NULL AUTO_INCREMENT,
  `Animaux_autorisés` tinyint NOT NULL DEFAULT '0',
  `Parking_Accessible` tinyint NOT NULL DEFAULT '0',
  `Parking_gratuit` tinyint NOT NULL DEFAULT '0',
  `Logement_fumeur` tinyint NOT NULL DEFAULT '0',
  `Arrivée_autonome` tinyint NOT NULL DEFAULT '0',
  `Piéces_de_plain_pied` tinyint NOT NULL DEFAULT '0',
  `Accees_sup_81` tinyint NOT NULL DEFAULT '0',
  `Barres_appui` tinyint NOT NULL DEFAULT '0',
  `Siége_de_douche_bain` tinyint NOT NULL DEFAULT '0',
  `Léve_personne` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`idGite_accessibilite`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gite_accessibilite`
--

LOCK TABLES `gite_accessibilite` WRITE;
/*!40000 ALTER TABLE `gite_accessibilite` DISABLE KEYS */;
INSERT INTO `gite_accessibilite` VALUES (1,0,1,0,0,1,0,0,0,0,0),(2,0,0,1,0,0,0,0,0,0,0),(3,0,0,1,0,0,0,1,1,0,0),(4,0,0,1,0,0,0,1,0,0,0),(5,0,0,0,0,0,0,0,0,0,0),(6,0,0,1,0,0,0,1,0,0,0),(7,0,0,0,0,0,0,0,0,0,0),(8,0,0,0,0,0,0,0,0,0,0),(9,0,0,1,0,0,0,0,1,0,0),(10,0,0,0,0,0,0,1,1,0,0),(11,0,0,0,0,0,0,1,1,0,0),(12,0,0,0,0,0,0,1,1,0,0),(13,0,0,0,0,0,0,1,1,0,0),(14,0,0,0,0,0,0,1,1,0,0),(15,0,0,0,0,0,0,1,1,0,0),(16,0,0,0,0,0,0,1,1,0,0),(17,0,0,1,0,0,0,0,1,0,0),(18,0,0,1,0,0,0,0,1,0,0),(19,0,0,1,0,0,0,0,1,0,0),(20,0,0,1,0,0,0,0,1,0,0),(21,0,0,1,0,0,0,0,1,0,0),(22,0,0,0,0,0,0,0,0,0,0),(23,0,0,0,0,0,0,0,0,0,0),(24,0,0,0,0,0,0,0,0,0,0),(25,0,0,0,0,0,0,0,0,0,0),(26,0,0,1,0,0,0,1,0,0,0),(27,0,0,1,0,0,0,0,0,0,0),(28,0,0,0,0,0,0,0,0,0,0);
/*!40000 ALTER TABLE `gite_accessibilite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gite_equipement`
--

DROP TABLE IF EXISTS `gite_equipement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gite_equipement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `wifi` tinyint(1) DEFAULT '0',
  `fibre` tinyint(1) NOT NULL DEFAULT '0',
  `Deconnecté` tinyint(1) NOT NULL DEFAULT '0',
  `Ethernet` tinyint(1) NOT NULL DEFAULT '0',
  `Climatisation` tinyint(1) NOT NULL DEFAULT '0',
  `Chauffage` tinyint(1) NOT NULL DEFAULT '0',
  `Cheminée` tinyint(1) NOT NULL DEFAULT '0',
  `Cuisine_équipée` tinyint(1) NOT NULL DEFAULT '0',
  `Espace_de_travail` tinyint(1) NOT NULL DEFAULT '0',
  `Télévision` tinyint(1) NOT NULL DEFAULT '0',
  `Salle_de_sport` tinyint(1) NOT NULL DEFAULT '0',
  `Pisine` tinyint(1) NOT NULL DEFAULT '0',
  `Jacuzzi` tinyint(1) NOT NULL DEFAULT '0',
  `Barbecue` tinyint(1) NOT NULL DEFAULT '0',
  `Caméras_exterieures` tinyint(1) NOT NULL DEFAULT '0',
  `Détecteur_de_fuméé` tinyint(1) NOT NULL DEFAULT '0',
  `Détecteur_de_co2` tinyint(1) NOT NULL DEFAULT '0',
  `Station_de_recharge` tinyint(1) NOT NULL DEFAULT '0',
  `Reservation_instantanée` tinyint(1) NOT NULL DEFAULT '0',
  `Petit_dejeuner` tinyint(1) NOT NULL DEFAULT '0',
  `Séche_cheveux` tinyint(1) NOT NULL DEFAULT '0',
  `Fer_a_repasser` tinyint(1) NOT NULL DEFAULT '0',
  `Séche_linge` tinyint(1) NOT NULL DEFAULT '0',
  `Lave_linge` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gite_equipement`
--

LOCK TABLES `gite_equipement` WRITE;
/*!40000 ALTER TABLE `gite_equipement` DISABLE KEYS */;
INSERT INTO `gite_equipement` VALUES (1,1,0,0,0,1,1,0,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0),(2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0),(3,1,0,0,1,0,1,1,1,1,1,0,0,1,1,1,0,0,0,0,1,0,1,1,1),(4,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0),(5,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0),(6,1,0,0,1,0,1,1,1,1,1,0,0,0,0,0,1,0,0,1,0,1,0,1,1),(7,1,0,0,1,0,1,1,1,0,0,0,0,0,1,0,0,0,0,1,1,0,0,1,1),(8,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0),(9,1,1,0,1,0,0,1,1,1,1,0,1,0,1,1,0,0,1,1,1,1,1,1,1),(10,1,1,0,1,0,1,1,1,1,1,0,0,0,1,1,1,1,0,1,1,0,0,0,1),(11,1,1,0,1,0,1,1,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0),(12,1,1,0,1,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0),(13,1,1,0,1,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0),(14,1,1,0,1,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0),(15,1,1,0,1,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0),(16,1,1,0,1,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0),(17,1,1,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,0,1,1,0,0,0,1),(18,1,1,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,0,1,1,0,0,0,1),(19,1,1,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,0,1,1,0,0,0,1),(20,1,1,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,0,1,1,0,0,0,1),(21,1,1,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,0,1,1,0,0,0,1),(22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(23,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0),(24,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0),(25,0,1,0,1,0,0,1,1,1,0,0,0,0,0,0,1,1,0,1,1,1,0,0,0),(26,0,1,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0,1,0,0,1,1),(27,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(28,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0);
/*!40000 ALTER TABLE `gite_equipement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gite_favoris`
--

DROP TABLE IF EXISTS `gite_favoris`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gite_favoris` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Utilisateur_id` int NOT NULL,
  `Gite_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Gite_favoris_Utilisateur1_idx` (`Utilisateur_id`),
  KEY `fk_Gite_favoris_Gite1_idx` (`Gite_id`),
  CONSTRAINT `fk_Gite_favoris_Gite1` FOREIGN KEY (`Gite_id`) REFERENCES `gite` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Gite_favoris_Utilisateur1` FOREIGN KEY (`Utilisateur_id`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gite_favoris`
--

LOCK TABLES `gite_favoris` WRITE;
/*!40000 ALTER TABLE `gite_favoris` DISABLE KEYS */;
/*!40000 ALTER TABLE `gite_favoris` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gite_image`
--

DROP TABLE IF EXISTS `gite_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gite_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lien_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Gite_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Gite_image_Gite1_idx` (`Gite_id`),
  CONSTRAINT `fk_Gite_image_Gite1` FOREIGN KEY (`Gite_id`) REFERENCES `gite` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gite_image`
--

LOCK TABLES `gite_image` WRITE;
/*!40000 ALTER TABLE `gite_image` DISABLE KEYS */;
INSERT INTO `gite_image` VALUES (1,'1.jpg,2.jpg,3.jpg',1);
/*!40000 ALTER TABLE `gite_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `langue`
--

DROP TABLE IF EXISTS `langue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `langue` (
  `id` int NOT NULL AUTO_INCREMENT,
  `anglais` tinyint(1) DEFAULT NULL,
  `allemand` tinyint(1) DEFAULT NULL,
  `francais` tinyint(1) DEFAULT NULL,
  `italien` tinyint(1) DEFAULT NULL,
  `espagnol` tinyint(1) DEFAULT NULL,
  `arabe` tinyint(1) DEFAULT NULL,
  `portuguais` tinyint(1) DEFAULT NULL,
  `langue_des_signes` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `langue`
--

LOCK TABLES `langue` WRITE;
/*!40000 ALTER TABLE `langue` DISABLE KEYS */;
INSERT INTO `langue` VALUES (1,0,0,0,0,0,0,0,0),(2,1,0,1,0,0,1,0,0),(3,1,1,0,0,1,0,0,0),(4,0,0,1,1,0,1,0,0),(5,1,0,1,0,0,1,0,0),(6,1,0,1,0,0,0,0,1),(7,1,0,1,0,0,0,0,1),(8,0,1,1,1,0,1,0,0),(9,1,0,1,0,0,1,0,0),(10,1,0,1,0,0,0,0,0),(11,1,0,1,0,0,0,0,0),(12,1,0,1,0,0,0,0,0),(13,1,0,1,0,0,0,0,0),(14,1,0,1,0,0,0,0,0),(15,1,0,1,0,0,0,0,0),(16,1,0,1,0,0,0,0,0),(17,1,0,1,1,0,0,0,0),(18,1,0,1,1,0,0,0,0),(19,1,0,1,1,0,0,0,0),(20,1,0,1,1,0,0,0,0),(21,1,0,1,1,0,0,0,0),(22,0,0,0,0,0,0,0,0),(23,1,0,1,0,1,0,0,0),(24,0,0,1,0,0,1,0,0),(25,1,0,1,0,0,1,0,0),(26,1,0,1,0,1,1,0,0),(27,1,1,1,1,1,0,0,0),(28,1,1,0,0,0,0,0,0);
/*!40000 ALTER TABLE `langue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `localisation`
--

DROP TABLE IF EXISTS `localisation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `localisation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adresse` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localisation`
--

LOCK TABLES `localisation` WRITE;
/*!40000 ALTER TABLE `localisation` DISABLE KEYS */;
INSERT INTO `localisation` VALUES (1,'Veulettes-sur-Mer, Normandie, France',NULL,NULL),(2,'Veulettes-sur-Mer, Normandie, France',NULL,NULL);
/*!40000 ALTER TABLE `localisation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moyen_paiement`
--

DROP TABLE IF EXISTS `moyen_paiement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moyen_paiement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Nom` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moyen_paiement`
--

LOCK TABLES `moyen_paiement` WRITE;
/*!40000 ALTER TABLE `moyen_paiement` DISABLE KEYS */;
INSERT INTO `moyen_paiement` VALUES (1,'Paypal'),(2,'Carte');
/*!40000 ALTER TABLE `moyen_paiement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `piece`
--

DROP TABLE IF EXISTS `piece`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `piece` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Gite_id` int NOT NULL,
  `Piece_type_id` int NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Piece_equipement_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Piece_Piece_type_idx` (`Piece_type_id`),
  KEY `fk_Piece_Gite1_idx` (`Gite_id`),
  KEY `fk_Piece_Piece_equipement1_idx` (`Piece_equipement_id`),
  CONSTRAINT `fk_Piece_Gite1` FOREIGN KEY (`Gite_id`) REFERENCES `gite` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Piece_Piece_equipement1` FOREIGN KEY (`Piece_equipement_id`) REFERENCES `piece_equipement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Piece_Piece_type` FOREIGN KEY (`Piece_type_id`) REFERENCES `piece_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `piece`
--

LOCK TABLES `piece` WRITE;
/*!40000 ALTER TABLE `piece` DISABLE KEYS */;
/*!40000 ALTER TABLE `piece` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `piece_equipement`
--

DROP TABLE IF EXISTS `piece_equipement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `piece_equipement` (
  `id` int NOT NULL,
  `lit_simple` tinyint(1) DEFAULT '0',
  `lit_double` tinyint(1) DEFAULT '0',
  `lit_bébé` tinyint(1) DEFAULT '0',
  `climatiseur` tinyint(1) DEFAULT '0',
  `espace_travail` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `piece_equipement`
--

LOCK TABLES `piece_equipement` WRITE;
/*!40000 ALTER TABLE `piece_equipement` DISABLE KEYS */;
/*!40000 ALTER TABLE `piece_equipement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `piece_type`
--

DROP TABLE IF EXISTS `piece_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `piece_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `piece_type`
--

LOCK TABLES `piece_type` WRITE;
/*!40000 ALTER TABLE `piece_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `piece_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proprietaire`
--

DROP TABLE IF EXISTS `proprietaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proprietaire` (
  `id` int NOT NULL AUTO_INCREMENT,
  `is_professionnel` tinyint(1) DEFAULT NULL,
  `siren` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telephone_pro` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_pro` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` float DEFAULT NULL,
  `Utilisateur_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_proprietaire_Utilisateur1_idx` (`Utilisateur_id`),
  CONSTRAINT `fk_proprietaire_Utilisateur1` FOREIGN KEY (`Utilisateur_id`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proprietaire`
--

LOCK TABLES `proprietaire` WRITE;
/*!40000 ALTER TABLE `proprietaire` DISABLE KEYS */;
INSERT INTO `proprietaire` VALUES (1,0,'','','',NULL,1);
/*!40000 ALTER TABLE `proprietaire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Gite_id` int NOT NULL,
  `Utilisateur_id` int NOT NULL,
  `Moyen_paiement_id` int NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL,
  `prix_total` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Reservation_Moyen_paiement1_idx` (`Moyen_paiement_id`),
  KEY `fk_Reservation_Gite1_idx` (`Gite_id`),
  KEY `fk_reservation_Utilisateur1_idx` (`Utilisateur_id`),
  CONSTRAINT `fk_Reservation_Gite1` FOREIGN KEY (`Gite_id`) REFERENCES `gite` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Reservation_Moyen_paiement1` FOREIGN KEY (`Moyen_paiement_id`) REFERENCES `moyen_paiement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_reservation_Utilisateur1` FOREIGN KEY (`Utilisateur_id`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES (1,1,1,2,'2023-11-21','2023-11-27',180);
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Langue_id` int DEFAULT NULL,
  `Localisation_id` int DEFAULT NULL,
  `nom` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prenom` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telephone` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `mot_de_passe` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pseudo` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` float DEFAULT NULL,
  `lien_avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_Utilisateur_Localisation1_idx` (`Localisation_id`),
  KEY `fk_Utilisateur_Langue1_idx` (`Langue_id`),
  CONSTRAINT `fk_Utilisateur_Langue1` FOREIGN KEY (`Langue_id`) REFERENCES `langue` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Utilisateur_Localisation1` FOREIGN KEY (`Localisation_id`) REFERENCES `localisation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur`
--

LOCK TABLES `utilisateur` WRITE;
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
INSERT INTO `utilisateur` VALUES (1,NULL,NULL,'belamiri','djebbar','0646577793','belamiri113@gmail.com','$2a$10$JYVVlI/ONrAvLbg335tVwOZKreWB18CfxRUwoQ3PkEqtuN0Ay8bMm','bihak',NULL,'bihak.jpg');
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-21  1:32:55
