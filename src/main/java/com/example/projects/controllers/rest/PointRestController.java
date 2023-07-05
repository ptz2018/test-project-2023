package com.example.projects.controllers.rest;


import com.example.projects.dto.GroupDTO;
import com.example.projects.service.impl.PointServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PointRestController {
    private final PointServiceImpl pointService;

    @Autowired
    public PointRestController(PointServiceImpl pointService) {
        this.pointService = pointService;
    }

    @GetMapping
    private List<GroupDTO> getAll(){
        return pointService.getAll();
    }
    @GetMapping("/count")
    private ResponseEntity<?> getCount(){
        return ResponseEntity.ok(pointService.getCountPointsFromGroups());
    }
}
