package com.example.projects.editors;

import com.example.projects.exceptions.WrongIdValueException;
import com.example.projects.model.Point;
import com.example.projects.repository.GroupRepository;
import org.apache.commons.lang3.math.NumberUtils;

import java.beans.PropertyEditorSupport;

public class PointidEditor extends PropertyEditorSupport {
    private final GroupRepository groupRepository;

    @Override
    public String getAsText() {
        Point point = (Point) getValue();
        return point == null ? "" : Integer.toString(point.getId());
    }

    @Override
    public void setAsText(String text) {
        if (NumberUtils.isParsable(text)) {
            setValue(groupRepository.getById(Integer.parseInt(text)));
        } else {
            throw new WrongIdValueException("Wrong id parameter, please check it for letters or symbols");
        }
    }

    public PointidEditor(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }
}
