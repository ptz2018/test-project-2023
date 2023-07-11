package com.example.projects.service;

import com.example.projects.dto.GroupDTO;
import com.example.projects.exceptions.GroupNotFoundException;

import java.util.Date;
import java.util.List;

public interface GroupService {
    public List<GroupDTO> getAll();
    public GroupDTO getGroupById(int id) throws GroupNotFoundException;
    public List<Object[]> getCountPointsFromGroups();
    public List<GroupDTO> getGroupsAfterDate(Date date);

}
