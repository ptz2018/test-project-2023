package com.example.projects.controllers.rest;

import com.example.projects.dto.GroupDTO;
import com.example.projects.dto.MapDTO;
import com.example.projects.dto.PointDTO;
import com.example.projects.dto.RouteDTO;
import com.example.projects.dto.RoutePointDTO;
import com.example.projects.editors.PointidEditor;
import com.example.projects.exceptions.GroupNotFoundException;
import com.example.projects.model.Point;
import com.example.projects.model.RoutePoint;
import com.example.projects.repository.GroupRepository;
import com.example.projects.service.impl.GroupServiceImpl;
import com.example.projects.service.impl.MapServiceImpl;
import com.example.projects.service.impl.PointServiceImpl;
import com.example.projects.service.impl.RoutePointServiceImpl;
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
    private final RoutePointServiceImpl routePointService;
    private final GroupRepository groupRepository;
    private final MapServiceImpl mapService;

    @Autowired
    public PointRestController(GroupServiceImpl groupService, PointServiceImpl pointService,
                               RouteServiceImpl routeService, RoutePointServiceImpl routePointService,
                               GroupRepository groupRepository, MapServiceImpl mapService) {
        this.groupService = groupService;
        this.pointService = pointService;
        this.routeService = routeService;
        this.routePointService = routePointService;
        this.groupRepository = groupRepository;
        this.mapService = mapService;
    }

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.registerCustomEditor(Point.class, new PointidEditor(groupRepository));
    }


    @GetMapping
    private List<GroupDTO> getAll() {
        return groupService.getAll();
    }

    @GetMapping("/count")
    private ResponseEntity<?> getCount() {
        return ResponseEntity.ok(groupService.getCountPointsFromGroups());
    }

    @GetMapping("/date")
    private List<GroupDTO> getGroupsBefore(@RequestBody Date date) {
        return groupService.getGroupsAfterDate(date);
    }

    @GetMapping("/{id}")
    private GroupDTO getGroupById(@PathVariable int id) throws GroupNotFoundException {
        return groupService.getGroupById(id);
    }

    @PatchMapping("/point/{point}")
    public PointDTO updatePoint(@PathVariable Point point, @RequestBody PointDTO pointDTO) {
        return pointService.update(pointDTO, point);
    }

    @PatchMapping("/route-point/{point}")
    public RoutePointDTO updateRoutePoint(@PathVariable RoutePoint point, @RequestBody RoutePointDTO routePointDTO){
        return routePointService.update(routePointDTO, point);
    }

    @GetMapping("/ids")
    private List<GroupDTO> getGroupsByIds(@RequestParam List<Integer> ids) {
        return groupService.getGroupsByIds(ids);
    }

    @GetMapping("/routes")
    private List<RouteDTO> getAllRoutes() {
        return routeService.getAllRoutes();
    }
    @GetMapping("/maps")
    private List<MapDTO> getAllMaps() {
        return mapService.getAll();
    }
}
