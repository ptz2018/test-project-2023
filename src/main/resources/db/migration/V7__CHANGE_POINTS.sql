UPDATE `route`
SET `name` = 'Симферополь-Севастополь', `group__id` = 1
WHERE id = 2;

UPDATE `route_points`
SET `x`= 44.942053868131055, `y` = 34.09692287584081, `order` = 1, `route_id` = 2
WHERE id = 1;

UPDATE `route_points`
SET `x`= 44.9077536898407, `y` = 34.01425572747829, `order` = 2, `route_id` = 2
WHERE id = 2;

UPDATE `route_points`
SET `x`= 44.69070415729673, `y` = 33.764692432686935, `order` = 6, `route_id` = 2
WHERE id = 3;

UPDATE `route_points`
SET `x`= 44.68119890770458, `y` = 33.61455441777135, `order` = 7, `route_id` = 2
WHERE id = 4;

UPDATE `route_points`
SET `x`= 44.8478882886617, `y` = 34.005516156843576, `order` = 3, `route_id` = 2
WHERE id = 5;

UPDATE `route_points`
SET `x`= 44.812765820449656, `y` = 33.93074427474655, `order` = 4, `route_id` = 2
WHERE id = 6;

UPDATE `route_points`
SET `x`= 44.759007705647136, `y` = 33.8384932513801, `order` = 5, `route_id` = 2
WHERE id = 7;