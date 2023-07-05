package com.example.projects.service;


import com.example.projects.dto.GroupDTO;
import com.example.projects.dto.PointDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class PointService {

    public List<GroupDTO> getAll(){
        GroupDTO group1 = new GroupDTO(1L,"group1",new Date());
        GroupDTO group2 = new GroupDTO(2L,"group1",new Date());
        GroupDTO group3 = new GroupDTO(3L,"group1",new Date());

        group1.setPoints(new ArrayList<>());
        group2.setPoints(new ArrayList<>());
        group3.setPoints(new ArrayList<>());

        group1.getPoints().add(new PointDTO(1L,34.36,45.66));
        group1.getPoints().add(new PointDTO(2L,35.36,44.66));
        group1.getPoints().add(new PointDTO(3L,36.36,43.66));

        group2.getPoints().add(new PointDTO(5L,37.36,41.66));
        group2.getPoints().add(new PointDTO(6L,33.36,43.66));
        group2.getPoints().add(new PointDTO(7L,36.36,42.66));

        group3.getPoints().add(new PointDTO(6L,39.36,45.66));
        group3.getPoints().add(new PointDTO(8L,34.36,41.66));
        group3.getPoints().add(new PointDTO(10L,31.36,41.66));

        return List.of(group1,group2,group3);
    }
}
