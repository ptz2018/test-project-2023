package com.example.projects.dto;

import java.util.Date;
import java.util.List;

public class GroupDTO {
    private int id;
    private String name;
    private Date updatedAt;

    private List<PointDTO> points;

    public GroupDTO(int id, String name, Date updatedAt) {
        this.id = id;
        this.name = name;
        this.updatedAt = updatedAt;
    }

    public List<PointDTO> getPoints() {
        return points;
    }

    public void setPoints(List<PointDTO> points) {
        this.points = points;
    }

    public GroupDTO() {
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

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
