-- Student table
CREATE TABLE `studentregistrymanagement`.`studentstable` (
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `id` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `isActive` TINYINT NOT NULL DEFAULT 1,
  `teachersAssigned` VARCHAR(255) NOT NULL,
  `receiveNotifications` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);