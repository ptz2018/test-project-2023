package com.example.projects.model;

import com.example.projects.enums.PointTypeEnum;
import javax.persistence.*;

@Entity
@Table(name = "points")
public class Point {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;
    private double x;
    private double y;
    @Enumerated(EnumType.STRING)
    private PointTypeEnum pointType;
    private String description;
    @ManyToOne
    @JoinColumn(name = "group_id", referencedColumnName = "id")
    private Group group;

    public Point() {
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

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public PointTypeEnum getPointType() { return pointType; }

    public void setPointType(PointTypeEnum pointType) { this.pointType = pointType; }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public String getDescription() {return description;}

    public void setDescription(String description) {this.description = description;}

}
