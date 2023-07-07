package com.example.projects.dto;

import com.example.projects.model.Group;
import com.example.projects.model.RoutePoint;

import javax.persistence.*;
import java.util.List;

public class RouteDTO {

    private int id;
    private String name;

    private Group group;

    private List<RoutePoint> routePoints;

    public RouteDTO() {
    }

    public List<RoutePoint> getRoutePoints() {
        return routePoints;
    }

    public void setRoutePoints(List<RoutePoint> routePoints) {
        this.routePoints = routePoints;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }
}
