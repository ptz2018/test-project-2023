package com.example.projects.service.impl;

import com.example.projects.dto.GroupDTO;
import com.example.projects.model.Group;
import com.example.projects.repository.GroupRepository;
import com.example.projects.service.GroupService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional(readOnly=true)
public class GroupServiceImpl implements GroupService {
    private final GroupRepository groupRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public GroupServiceImpl(GroupRepository groupRepository, ModelMapper modelMapper) {
        this.groupRepository = groupRepository;
        this.modelMapper = modelMapper;
    }

    public List<GroupDTO> getAll(){
        List<Group> groups = groupRepository.findAllGroup();
        return getConvertedGroup(groups);
    }

    @Override
    public GroupDTO getGroupById(int id) {
        return convertToGroupDTO(groupRepository.getById(id));
    }

    @Override
    public List<Object[]> getCountPointsFromGroups() {
        return groupRepository.getCountPointsFromGroups();
    }

    @Override
    public List<GroupDTO> getGroupsAfterDate(Date date) {
        return getConvertedGroup(groupRepository.getGroupsAfter(date));
    }

    private GroupDTO convertToGroupDTO(Group group){
        return modelMapper.map(group,GroupDTO.class);
    }

    private List<GroupDTO> getConvertedGroup(List<Group> groups){
        List<GroupDTO> groupDTOS = new ArrayList<>();
        for(Group group: groups){
            groupDTOS.add(convertToGroupDTO(group));
        }
        return groupDTOS;
    }
}
