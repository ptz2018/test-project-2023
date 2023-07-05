package com.example.projects.service.impl;

import com.example.projects.dto.GroupDTO;
import com.example.projects.dto.PointDTO;
import com.example.projects.model.Group;
import com.example.projects.model.Point;
import com.example.projects.repository.PointRepository;
import com.example.projects.service.PointService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class PointServiceImpl implements PointService {

    private final PointRepository pointRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public PointServiceImpl(PointRepository pointRepository, ModelMapper modelMapper) {
        this.pointRepository = pointRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    @Transactional
    public PointDTO update(PointDTO pointDTO, int id) {
        Point point = convertPoint(pointDTO);
        pointRepository.updatePointById(point.getX(), point.getY(),id);
        return convertToPointDTO(pointRepository.getById(id));
    }
    private Point convertPoint(PointDTO pointDTO){
        return modelMapper.map(pointDTO,Point.class);
    }
    private PointDTO convertToPointDTO(Point point){
        return modelMapper.map(point,PointDTO.class);
    }
}
