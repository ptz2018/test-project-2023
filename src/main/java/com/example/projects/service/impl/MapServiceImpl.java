package com.example.projects.service.impl;

import com.example.projects.dto.MapDTO;
import com.example.projects.model.Map;
import com.example.projects.repository.MapRepository;
import com.example.projects.service.MapService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MapServiceImpl implements MapService {
    private final MapRepository mapRepository;
    private final ModelMapper modelMapper;

    public MapServiceImpl(MapRepository mapRepository, ModelMapper modelMapper) {
        this.mapRepository = mapRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<MapDTO> getAll() {
        List<Map> maps = mapRepository.getAllMaps();
        return getConvertedMaps(maps);
    }

    private MapDTO convertToMapDTO(Map map) {
        return modelMapper.map(map, MapDTO.class);
    }

    private List<MapDTO> getConvertedMaps(List<Map> maps) {
        return maps.stream()
                .map(this::convertToMapDTO)
                .collect(Collectors.toList());
    }


}
