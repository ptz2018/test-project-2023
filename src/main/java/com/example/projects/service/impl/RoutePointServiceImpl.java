package com.example.projects.service.impl;

import com.example.projects.dto.PointDTO;
import com.example.projects.dto.RoutePointDTO;
import com.example.projects.model.Point;
import com.example.projects.model.RoutePoint;
import com.example.projects.repository.RoutePointRepository;
import com.example.projects.service.RoutePointService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RoutePointServiceImpl implements RoutePointService {

    private final ModelMapper modelMapper;

    private final RoutePointRepository routePointRepository;

    private TypeMap<RoutePointDTO, RoutePoint> pointDTOPointTypeMap;


    @Autowired
    public RoutePointServiceImpl(ModelMapper modelMapper, RoutePointRepository routePointRepository) {
        this.modelMapper = modelMapper;
        this.routePointRepository = routePointRepository;
        pointDTOPointTypeMap = modelMapper.createTypeMap(RoutePointDTO.class, RoutePoint.class,
                modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT))
                .addMappings(mapper -> {
                    mapper.skip(RoutePoint::setId);
                });
    }

    @Override
    @Transactional
    public RoutePointDTO update(RoutePointDTO pointDTO, RoutePoint point) {
        pointDTOPointTypeMap.map(pointDTO, point);
        routePointRepository.updateRoutePointById(point);
        return convertToPointDTO(routePointRepository.getById(point.getId()));
    }


    private RoutePointDTO convertToPointDTO(RoutePoint point){
        return modelMapper.map(point,RoutePointDTO.class);
    }

}
