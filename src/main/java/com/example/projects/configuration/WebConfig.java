package com.example.projects.configuration;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
public class WebConfig {
    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }
}
