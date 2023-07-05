package com.example.projects.controllers.rest;


import com.example.projects.dto.GroupDTO;
import com.example.projects.service.impl.PointServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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

    @GetMapping("/date")
    private List<GroupDTO> getGroupsBefore(@RequestBody Date date){
        return pointService.getGroupsBeforeDate(date);
    }

    @GetMapping("/{id}")
    private GroupDTO getGroupById(@PathVariable int id){
        return pointService.getGroupById(id);
    }
}
