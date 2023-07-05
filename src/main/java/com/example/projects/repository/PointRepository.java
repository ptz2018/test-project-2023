package com.example.projects.repository;

import com.example.projects.model.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PointRepository extends JpaRepository<Point,Integer> {

    @Modifying
    @Query("update Point p set p.x=:x, p.y=:y where p.id =:id")
    void updatePointById(double x, double y, int id);

    Point getById(int id);
}
