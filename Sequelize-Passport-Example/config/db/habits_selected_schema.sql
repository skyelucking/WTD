CREATE TABLE `habits_selected` (
  `habitID` int NOT NULL AUTO_INCREMENT,
  `habitName` varchar(255) DEFAULT NULL,
  `categoryID` int DEFAULT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`habitID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
