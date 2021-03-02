CREATE TABLE `habits_completed` (
  `completedID` int NOT NULL AUTO_INCREMENT,
  `habitSelectedID` int DEFAULT NULL,
  `userId` int NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`completedID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
