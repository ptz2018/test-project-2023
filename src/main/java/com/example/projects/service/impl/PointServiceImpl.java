package com.example.projects.service.impl;

import com.example.projects.dto.GroupDTO;
import com.example.projects.dto.PointDTO;
import com.example.projects.model.Group;
import com.example.projects.model.Point;
import com.example.projects.repository.PointRepository;
import com.example.projects.service.PointService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class PointServiceImpl implements PointService {


    private final PointRepository pointRepository;
    private final ModelMapper modelMapper;
    private TypeMap<PointDTO, Point> pointDTOPointTypeMap;

    @Autowired
    public PointServiceImpl(PointRepository pointRepository, ModelMapper modelMapper) {
        this.pointRepository = pointRepository;
        this.modelMapper = modelMapper;
        pointDTOPointTypeMap = modelMapper.createTypeMap(PointDTO.class, Point.class)
                .addMappings(mapper -> mapper.skip(Point::setId));
    }

    @Override
    @Transactional
    public PointDTO update(PointDTO pointDTO, Point point) {
        pointDTOPointTypeMap.map(pointDTO, point);
        pointRepository.updatePointById(point);
        return convertToPointDTO(pointRepository.getById(point.getId()));
    }
    private PointDTO convertToPointDTO(Point point){
        return modelMapper.map(point,PointDTO.class);
    }
}
