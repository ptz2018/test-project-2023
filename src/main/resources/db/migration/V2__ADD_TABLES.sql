CREATE TABLE IF NOT EXISTS `route`
(
    `id`         INT         NOT NULL,
    `name`       VARCHAR(45) NULL,
    `group__id`   INT         NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `id_idx` (`group__id` ASC) VISIBLE,
    CONSTRAINT `group__id`
    FOREIGN KEY (`group__id`)
    REFERENCES `groups` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    )
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `route_points`
(
    `id`       INT   NOT NULL,
    `x`        FLOAT NULL,
    `y`        FLOAT NULL,
    `order`    INT   NOT NULL,
    `route_id` INT   NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `id_idx` (`route_id` ASC) VISIBLE,
    CONSTRAINT `route_id`
    FOREIGN KEY (`route_id`)
    REFERENCES `route` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    )
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8;

INSERT INTO `route` (`id`, `name`, `group__id`)
VALUES (1, 'Севастополь-Ялта', 1);
INSERT INTO `route` (`id`, `name`, `group__id`)
VALUES (2, 'Севастополь-Симферополь', 1);
INSERT INTO `route` (`id`, `name`, `group__id`)
VALUES (3, 'Симферополь-Керчь', 1);

INSERT INTO `route_points` (`id`, `x`, `y`, `order`, `route_id`)
VALUES (1, 44.681246727362414, 33.61285576998825, 1, 2);
INSERT INTO `route_points` (`id`, `x`, `y`, `order`, `route_id`)
VALUES (2, 44.69150949113915, 33.764711371450296, 2, 2);
INSERT INTO `route_points` (`id`, `x`, `y`, `order`, `route_id`)
VALUES (3, 44.76905637536224, 33.87151626096648, 6, 2);
INSERT INTO `route_points` (`id`, `x`, `y`, `order`, `route_id`)
VALUES (4, 44.948024216582716, 34.0987450855438, 7, 2);
INSERT INTO `route_points` (`id`, `x`, `y`, `order`, `route_id`)
VALUES (5, 44.711893228394, 33.8064317176719, 3, 2);
INSERT INTO `route_points` (`id`, `x`, `y`, `order`, `route_id`)
VALUES (6, 44.76746871338109, 33.85641765154788, 4, 2);
INSERT INTO `route_points` (`id`, `x`, `y`, `order`, `route_id`)
VALUES (7, 44.761317652916404, 33.86941269391174, 5, 2);
