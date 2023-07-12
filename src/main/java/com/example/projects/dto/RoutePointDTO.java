package com.example.projects.dto;

public class RoutePointDTO {

    private int id;
    private double x;
    private double y;

    private int order;

    public RoutePointDTO() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getX() {
        return x;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
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

    @Override
    public String toString() {
        return "RoutePointDTO{" +
                "id=" + id +
                ", x=" + x +
                ", y=" + y +
                ", order=" + order +
                '}';
    }
}
