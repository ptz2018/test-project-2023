package com.example.projects.service.impl;

import com.example.projects.dto.RoutePointDTO;
import com.example.projects.model.RoutePoint;
import com.example.projects.repository.RoutePointRepository;
import com.example.projects.service.RoutePointService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoutePointServiceImpl implements RoutePointService {

    private final ModelMapper modelMapper;

    private final RoutePointRepository routePointRepository;
    @Autowired
    public RoutePointServiceImpl(ModelMapper modelMapper, RoutePointRepository routePointRepository) {
        this.modelMapper = modelMapper;
        this.routePointRepository = routePointRepository;
    }

    @Override
    public RoutePointDTO update(RoutePointDTO pointDTO, RoutePoint point) {
        modelMapper.createTypeMap(RoutePointDTO.class, RoutePoint.class)
                .addMappings(mapper -> mapper.skip(RoutePoint::setId))
                .map(pointDTO, point);
        routePointRepository.updateRoutePointById(point);
        return convertToPointDTO(routePointRepository.getById(point.getId()));
    }

    private RoutePointDTO convertToPointDTO(RoutePoint point){
        return modelMapper.map(point,RoutePointDTO.class);
    }

}
