package com.example.projects.repository;

import com.example.projects.model.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PointRepository extends JpaRepository<Point,Integer> {

    @Modifying
    @Query("update Point p set p.x=:#{#point.x}, p.y=:#{#point.y} where p.id =:#{#point.id}")
    void updatePointById(Point point);

    Point getById(int id);
}
