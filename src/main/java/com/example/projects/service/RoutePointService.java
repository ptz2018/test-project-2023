package com.example.projects.service;

import com.example.projects.dto.PointDTO;
import com.example.projects.dto.RoutePointDTO;
import com.example.projects.model.Point;
import com.example.projects.model.RoutePoint;

public interface RoutePointService {
    public RoutePointDTO update(RoutePointDTO pointDTO, RoutePoint point);

}
