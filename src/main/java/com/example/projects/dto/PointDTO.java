package com.example.projects.dto;

import com.example.projects.enums.PointTypeEnum;

public class PointDTO {
    private int id;
    private double x;
    private double y;

    private PointTypeEnum point_type;

    public PointDTO() {
    }

    public PointDTO(int id, double x, double y, PointTypeEnum point_type) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.point_type = point_type;
    }

    public PointTypeEnum getPoint_type() { return point_type; }

    public void setPoint_type(PointTypeEnum point_type) { this.point_type = point_type; }

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
}
