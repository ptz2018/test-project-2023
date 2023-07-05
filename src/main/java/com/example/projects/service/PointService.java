package com.example.projects.service;

import com.example.projects.dto.GroupDTO;

import java.util.List;

public interface PointService {

    public List<GroupDTO> getAll();
    public GroupDTO getGroupById();
    public List<Object[]> getCountPointsFromGroups();

}
