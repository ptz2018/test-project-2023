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
VALUES (2, 'Симферополь-Севастополь', 1);
INSERT INTO `route` (`id`, `name`, `group__id`)
VALUES (3, 'Симферополь-Керчь', 1);

INSERT INTO `route_points` (`id`, `x`, `y`, `order`, `route_id`)
VALUES (1, 44.942053868131055, 34.09692287584081, 1, 2);
INSERT INTO `route_points` (`id`, `x`, `y`, `order`, `route_id`)
VALUES (2, 44.9077536898407, 34.01425572747829, 2, 2);
INSERT INTO `route_points` (`id`, `x`, `y`, `order`, `route_id`)
VALUES (5, 44.8478882886617, 34.005516156843576, 3, 2);
INSERT INTO `route_points` (`id`, `x`, `y`, `order`, `route_id`)
VALUES (6, 44.812765820449656, 33.93074427474655, 4, 2);
INSERT INTO `route_points` (`id`, `x`, `y`, `order`, `route_id`)
VALUES (7, 44.759007705647136, 33.8384932513801, 5, 2);
INSERT INTO `route_points` (`id`, `x`, `y`, `order`, `route_id`)
VALUES (3, 44.69070415729673, 33.764692432686935, 6, 2);
INSERT INTO `route_points` (`id`, `x`, `y`, `order`, `route_id`)
VALUES (4, 44.68119890770458, 33.61455441777135, 7, 2);
