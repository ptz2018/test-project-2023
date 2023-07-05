package com.example.projects.service;

import com.example.projects.dto.GroupDTO;

import java.util.Date;
import java.util.List;

public interface GroupService {
    public List<GroupDTO> getAll();
    public GroupDTO getGroupById(int id);
    public List<Object[]> getCountPointsFromGroups();
    public List<GroupDTO> getGroupsAfterDate(Date date);

}
