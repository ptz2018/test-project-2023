package com.example.projects.repository;

import com.example.projects.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<Group, Integer> {

    @Query("from Group")
    List<Group> findAllGroup();

    @Query("""
                select g.id, g.name, count(p.id) as count from Group g
                    left join Point p on g.id = p.group group by g.id, g.name
    """)
    List<Object[]> getCountPointsFromGroups();

    @Query("from Group where updatedAt >= :date")
    List<Group> getGroupsAfter(Date date);

    @Query("from Group where id =:id")
    Group getById(int id);

}
