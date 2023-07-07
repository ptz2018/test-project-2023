package com.example.projects.service.impl;

import com.example.projects.dto.RouteDTO;
import com.example.projects.model.Route;
import com.example.projects.repository.RouteRepository;
import com.example.projects.service.RouteService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RouteServiceImpl implements RouteService {

    private final RouteRepository routeRepository;

    private final ModelMapper modelMapper;

    @Autowired
    public RouteServiceImpl(RouteRepository repository, ModelMapper modelMapper) {
        this.routeRepository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<RouteDTO> getAllRoutes() {
        return getConvertedRoutes(routeRepository.findAllRoute());
    }

    private RouteDTO convertToRouteDTO(Route route){
        return modelMapper.map(route,RouteDTO.class);
    }

    private List<RouteDTO> getConvertedRoutes(List<Route> routes){
        return routes.stream()
                .map(this::convertToRouteDTO)
                .collect(Collectors.toList());
    }
}
