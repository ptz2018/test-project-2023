package com.example.projects.editors;

import com.example.projects.dto.GroupDTO;
import com.example.projects.model.Group;
import com.example.projects.model.Point;
import com.example.projects.repository.GroupRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.beans.PropertyEditorSupport;

public class PointidEditor extends PropertyEditorSupport{
    private final GroupRepository groupRepository;

    @Override
    public String getAsText() {
        Point point = (Point) getValue();
        return point == null ? "" : Integer.toString(point.getId());
    }

    @Override
    public void setAsText(String text) throws NumberFormatException{
        Group group = groupRepository.getById(Integer.parseInt(text));
        setValue(group);
    }

    public PointidEditor(GroupRepository groupRepository){
        this.groupRepository = groupRepository;
    }



}
