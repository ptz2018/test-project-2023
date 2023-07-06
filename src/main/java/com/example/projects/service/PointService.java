package com.example.projects.service;

import com.example.projects.dto.PointDTO;
import com.example.projects.model.Point;

public interface PointService {
    public PointDTO update(PointDTO pointDTO, Point point);
}
