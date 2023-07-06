package com.example.projects.dto;

import java.util.Date;
import java.util.List;

public class GroupDTO {
    private int id;
    private String name;
    private Date updatedAt;

    private  Date deletedAt;

    private List<PointDTO> points;

    public GroupDTO(int id, String name, Date updatedAt, Date deletedAt) {
        this.id = id;
        this.name = name;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
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

    public Date getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(Date deletedAt) {
        this.deletedAt = deletedAt;
    }
}
