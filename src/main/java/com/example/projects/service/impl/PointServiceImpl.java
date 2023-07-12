package com.example.projects.service.impl;

import com.example.projects.dto.PointDTO;
import com.example.projects.dto.RoutePointDTO;
import com.example.projects.model.Point;
import com.example.projects.model.RoutePoint;
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

    @Autowired
    public PointServiceImpl(PointRepository pointRepository, ModelMapper modelMapper) {
        this.pointRepository = pointRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    @Transactional
    public PointDTO update(PointDTO pointDTO, Point point) {
        TypeMap<PointDTO, Point> typeMap = modelMapper.getTypeMap(PointDTO.class, Point.class);
        if (typeMap == null) {
            modelMapper.createTypeMap(PointDTO.class, Point.class)
                    .addMappings(mapper -> {
                        mapper.skip(Point::setId);
                    });
        }
        modelMapper.map(pointDTO, point);
        pointRepository.updatePointById(point);
        return convertToPointDTO(pointRepository.getById(point.getId()));
    }
    private PointDTO convertToPointDTO(Point point){
        return modelMapper.map(point,PointDTO.class);
    }
}
