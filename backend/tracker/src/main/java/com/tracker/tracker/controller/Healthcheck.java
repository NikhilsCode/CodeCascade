package com.tracker.tracker.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class Healthcheck {

    @GetMapping("/health-check")
    public String testing(){
        return "Test Working";
    }
}
