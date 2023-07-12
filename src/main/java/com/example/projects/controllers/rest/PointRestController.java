package com.example.projects.controllers.rest;

import com.example.projects.dto.GroupDTO;
import com.example.projects.dto.PointDTO;
import com.example.projects.dto.RouteDTO;
import com.example.projects.editors.PointidEditor;
import com.example.projects.exceptions.GroupNotFoundException;
import com.example.projects.model.Point;
import com.example.projects.repository.GroupRepository;
import com.example.projects.service.impl.GroupServiceImpl;
import com.example.projects.service.impl.PointServiceImpl;
import com.example.projects.service.impl.RouteServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PointRestController {
    private final GroupServiceImpl groupService;
    private final PointServiceImpl pointService;
    private final RouteServiceImpl routeService;
    private  final GroupRepository groupRepository;

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.registerCustomEditor(Point.class, new PointidEditor(groupRepository));
    }

    @Autowired
    public PointRestController(GroupServiceImpl groupService, PointServiceImpl pointService,
                               RouteServiceImpl routeService, GroupRepository groupRepository) {
        this.groupService = groupService;
        this.pointService = pointService;
        this.routeService = routeService;
        this.groupRepository = groupRepository;
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
    private GroupDTO getGroupById(@PathVariable int id) throws GroupNotFoundException {
        return groupService.getGroupById(id);
    }

    @PatchMapping("/{point}")
    public PointDTO updatePoint(@PathVariable Point point, @RequestBody PointDTO pointDTO) {
        return pointService.update(pointDTO, point);
    }

    @GetMapping("/ids")
    private List<GroupDTO> getGroupsByIds(@RequestParam List<Integer> ids){
        return groupService.getGroupsByIds(ids);
    }

    @GetMapping("/routes")
    private List<RouteDTO> getAllRoutes(){
        return routeService.getAllRoutes();
    }
}
