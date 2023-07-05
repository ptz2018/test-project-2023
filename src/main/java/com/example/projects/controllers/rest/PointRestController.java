package com.example.projects.controllers.rest;


import com.example.projects.dto.GroupDTO;
import com.example.projects.dto.PointDTO;
import com.example.projects.service.impl.GroupServiceImpl;
import com.example.projects.service.impl.PointServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PointRestController {
    private final GroupServiceImpl groupService;
    private final PointServiceImpl pointService;

    @Autowired
    public PointRestController(GroupServiceImpl groupService, PointServiceImpl pointService) {
        this.groupService = groupService;
        this.pointService = pointService;
    }
    @GetMapping
    private List<GroupDTO> getAll(){
        return groupService.getAll();
    }
    @GetMapping("/count")
    private ResponseEntity<?> getCount(){
        return ResponseEntity.ok(groupService.getCountPointsFromGroups());
    }

    @GetMapping("/date")
    private List<GroupDTO> getGroupsBefore(@RequestBody Date date){
        return groupService.getGroupsAfterDate(date);
    }

    @GetMapping("/{id}")
    private GroupDTO getGroupById(@PathVariable int id){
        return groupService.getGroupById(id);
    }

    @PatchMapping("/{id}")
    private PointDTO updatePoint(@RequestBody PointDTO pointDTO, @PathVariable int id){
        return pointService.update(pointDTO, id);
    }
}
