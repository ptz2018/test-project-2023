ALTER TABLE 'points'
ADD 'point_type' ENUM('None', 'Red', 'Green', 'Blue') NULL DEFAULT 'None';

UPDATE 'points'
SET 'point_type'= 'Red'
WHERE id = 1;

UPDATE 'points'
SET 'point_type'= 'Green'
WHERE id = 2;

UPDATE 'points'
SET 'point_type'= 'Blue'
WHERE id = 3;

UPDATE 'points'
SET 'point_type'= 'Blue'
WHERE id = 4;

UPDATE 'points'
SET 'point_type'= 'Green'
WHERE id = 5;

UPDATE 'points'
SET 'point_type'= 'Red'
WHERE id = 6;

UPDATE 'points'
SET 'point_type'= 'Red'
WHERE id = 7;

UPDATE 'points'
SET 'point_type'= 'Green'
WHERE id = 8;

UPDATE 'points'
SET 'point_type'= 'Blue'
WHERE id = 9;

UPDATE 'points'
SET 'point_type'= 'Blue'
WHERE id = 10;

UPDATE 'points'
SET 'point_type'= 'Green'
WHERE id = 11;

UPDATE 'points'
SET 'point_type'= 'Red'
WHERE id = 12;

UPDATE 'points'
SET 'point_type'= 'Red'
WHERE id = 13;

UPDATE 'points'
SET 'point_type'= 'Green'
WHERE id = 14;

UPDATE 'points'
SET 'point_type'= 'Blue'
WHERE id = 15;

UPDATE 'points'
SET 'point_type'= 'Blue'
WHERE id = 16;