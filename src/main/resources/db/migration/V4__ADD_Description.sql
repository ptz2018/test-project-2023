ALTER TABLE `points` ADD `description` VARCHAR(50) NOT NULL DEFAULT 'Тут должно быть описание';
UPDATE `points`  SET `description` = 'Севастополь город герой' WHERE id = 1;
UPDATE `points`  SET `description` = 'Ялта отдых и расслабление' WHERE id = 2;
UPDATE `points`  SET `description` = 'Симферополь город собиратель' WHERE id = 3;



