package com.example.projects.dto;

public class PointDTO {

    private Long id;
    private double x;
    private double y;

    public PointDTO() {
    }

    public PointDTO(Long id, double x, double y) {
        this.id = id;
        this.x = x;
        this.y = y;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
