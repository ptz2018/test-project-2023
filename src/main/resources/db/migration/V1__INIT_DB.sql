CREATE TABLE IF NOT EXISTS `groups`
(
    `id`         INT         NOT NULL,
    `name`       VARCHAR(45) NULL,
    `updated_at` DATETIME    NULL,
    `deleted_at` DATETIME    NULL,
    PRIMARY KEY (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `points`
(
    `id`       INT   NOT NULL,
    `x`        FLOAT NULL,
    `y`        FLOAT NULL,
    `group_id` INT   NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `id_idx` (`group_id` ASC) VISIBLE,
    CONSTRAINT `group_id`
        FOREIGN KEY (`group_id`)
            REFERENCES `groups` (`id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8;

INSERT INTO `groups` (`id`, `name`, `updated_at`, `deleted_at`)
VALUES (1, 'Крым', '2023-05-12 12:30:45', null);
INSERT INTO `groups` (`id`, `name`, `updated_at`, `deleted_at`)
VALUES (2, 'Краснодарский Край', '2023-06-12 14:50:31', null);
INSERT INTO `groups` (`id`, `name`, `updated_at`, `deleted_at`)
VALUES (3, 'Московская область', '2023-12-20 18:58:40', null);
INSERT INTO `groups` (`id`, `name`, `updated_at`, `deleted_at`)
VALUES (4, 'Воронежская область', '2023-12-20 18:58:40', null);
INSERT INTO `groups` (`id`, `name`, `updated_at`, `deleted_at`)
VALUES (5, 'Ставропольский край', '2023-12-20 18:58:40', null);

INSERT INTO `points` (`id`, `x`, `y`, `group_id`)
VALUES (1, 44.61470403958286, 33.52434498682296, 1);
INSERT INTO `points` (`id`, `x`, `y`, `group_id`)
VALUES (2, 44.49385240402408, 34.14631471983443, 1);
INSERT INTO `points` (`id`, `x`, `y`, `group_id`)
VALUES (3, 44.94886323147976, 34.10871660993952, 1);
INSERT INTO `points` (`id`, `x`, `y`, `group_id`)
VALUES (4, 45.04154096470527, 38.973076229102155, 2);
INSERT INTO `points` (`id`, `x`, `y`, `group_id`)
VALUES (5, 45.63789439203227, 38.93063096962156, 2);
INSERT INTO `points` (`id`, `x`, `y`, `group_id`)
VALUES (6, 44.74946507791376, 37.775200880308155, 2);
INSERT INTO `points` (`id`, `x`, `y`, `group_id`)
VALUES (7, 45.22059924610815, 36.68418910186632, 2);
INSERT INTO `points` (`id`, `x`, `y`, `group_id`)
VALUES (8, 55.764718975199365, 37.6117803069226, 3);
INSERT INTO `points` (`id`, `x`, `y`, `group_id`)
VALUES (9, 56.356866835727516, 38.21355482996441, 3);
INSERT INTO `points` (`id`, `x`, `y`, `group_id`)
VALUES (10, 55.463953219603376, 37.531593303266675, 3);
INSERT INTO `points` (`id`, `x`, `y`, `group_id`)
VALUES (11, 51.70507699541208, 39.216045107760394, 4);
INSERT INTO `points` (`id`, `x`, `y`, `group_id`)
VALUES (12, 50.3148618890673, 39.44713196786691, 4);
INSERT INTO `points` (`id`, `x`, `y`, `group_id`)
VALUES (13, 51.45377062480631, 42.04685914406523, 4);
INSERT INTO `points` (`id`, `x`, `y`, `group_id`)
VALUES (14, 45.043724347913745, 41.976540062247444, 5);
INSERT INTO `points` (`id`, `x`, `y`, `group_id`)
VALUES (15, 44.10765404067231, 42.982659259142764, 5);
INSERT INTO `points` (`id`, `x`, `y`, `group_id`)
VALUES (16, 45.77508990681652, 42.9124833601524, 5);
