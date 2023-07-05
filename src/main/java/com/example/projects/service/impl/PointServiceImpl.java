package com.example.projects.service.impl;


import com.example.projects.dto.GroupDTO;
import com.example.projects.model.Group;
import com.example.projects.repository.GeoRepository;
import com.example.projects.service.PointService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional(readOnly=true)
public class PointServiceImpl implements PointService {
    private final GeoRepository geoRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public PointServiceImpl(GeoRepository geoRepository, ModelMapper modelMapper) {
        this.geoRepository = geoRepository;
        this.modelMapper = modelMapper;
    }

    public List<GroupDTO> getAll(){
        List<Group> groups = geoRepository.findAllGroup();
        return getConvertedGroup(groups);
    }



    @Override
    public GroupDTO getGroupById(int id) {
        return convertToGroupDTO(geoRepository.getById(id));
    }

    @Override
    public List<Object[]> getCountPointsFromGroups() {
        return geoRepository.getCountPointsFromGroups();
    }

    @Override
    public List<GroupDTO> getGroupsBeforeDate(Date date) {
        return getConvertedGroup(geoRepository.getGroupsBefore(date));
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
