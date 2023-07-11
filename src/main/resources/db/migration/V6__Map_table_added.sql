CREATE TABLE IF NOT EXISTS `maps`
(
  `id`    INT          NOT NULL,
  `name`  VARCHAR(45)  NULL,
  `url`   VARCHAR(130) NULL,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;

INSERT INTO `maps` (`id`, `name`, `url`)
VALUES (1, 'По умолчанию', 'https://tile.openstreetmap.org/{z}/{x}/{y}.png');
INSERT INTO `maps` (`id`, `name`, `url`)
VALUES (2, 'Теплая', 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png');
INSERT INTO `maps` (`id`, `name`, `url`)
VALUES (3, 'Топографическая', 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png');
INSERT INTO `maps` (`id`, `name`, `url`)
VALUES (4, 'Темная', 'https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png');
INSERT INTO `maps` (`id`, `name`, `url`)
VALUES (5, 'Аэропорты', 'https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png');
INSERT INTO `maps` (`id`, `name`, `url`)
VALUES (6, 'Спутник', 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
INSERT INTO `maps` (`id`, `name`, `url`)
VALUES (7, 'Подробная', 'http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png');
