package com.example.projects.dto;

import com.example.projects.enums.PointTypeEnum;

public class PointDTO {
    private int id;
    private double x;
    private double y;
    private String description;
    private PointTypeEnum pointType;

    public PointDTO() {
    }

    public PointDTO(int id, double x, double y, PointTypeEnum pointType) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.pointType = pointType;
    }

    public PointTypeEnum getPointType() { return pointType; }

    public void setPointType(PointTypeEnum pointType) { this.pointType = pointType; }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public String getDescription() {return description;}

    public void setDescription(String description) {this.description = description;}

    @Override
    public String toString() {
        return "PointDTO{" +
                "id=" + id +
                ", x=" + x +
                ", y=" + y +
                ", description='" + description + '\'' +
                '}';
    }
}
