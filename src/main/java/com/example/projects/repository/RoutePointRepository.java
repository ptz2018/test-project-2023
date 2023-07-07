package com.example.projects.repository;

import com.example.projects.model.RoutePoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RoutePointRepository extends JpaRepository<RoutePoint, Integer> {

    @Modifying
    @Query("update RoutePoint p set p.x=:#{#point.x}, p.y=:#{#point.y} where p.id =:#{#point.id}")
    void updateRoutePointById(RoutePoint point);
}
