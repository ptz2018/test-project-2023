package com.example.projects.model;


import javax.persistence.*;

@Entity
@Table(name = "points")
public class Point {

    @Id
    @Column(name = "id")
    private Long id;
    private double x;
    private double y;
    @ManyToOne
    private Group group;

    public Point() {
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

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }
}
