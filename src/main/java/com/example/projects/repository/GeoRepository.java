package com.example.projects.repository;

import com.example.projects.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GeoRepository extends JpaRepository<Group, Integer> {

    @Query("from Group")
    List<Group> findAllGroup();
}
