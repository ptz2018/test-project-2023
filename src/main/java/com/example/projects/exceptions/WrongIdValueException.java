package com.example.projects.exceptions;

public class WrongIdValueException extends  RuntimeException{
    public WrongIdValueException(String errorMessage) {
        super(errorMessage);
    }
}
