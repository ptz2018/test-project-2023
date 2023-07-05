package com.example.projects.controllers.rest;


import com.example.projects.service.PointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PointRestController {
    private final PointService pointService;

    @Autowired
    public PointRestController(PointService pointService) {
        this.pointService = pointService;
    }

    @GetMapping
    private ResponseEntity<?> getAll(){
        return ResponseEntity.ok(pointService.getAll());
    }
}
