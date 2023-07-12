package com.example.projects.repository;

import com.example.projects.model.Group;
import com.example.projects.model.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MapRepository extends JpaRepository<Group, Integer> {
    @Query("from Map")
    List<Map> getAllMaps();
}
