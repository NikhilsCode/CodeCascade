package com.tracker.tracker.controller;

import com.tracker.tracker.entity.Environment;
import com.tracker.tracker.entity.DTO.ResponseDTO;
import com.tracker.tracker.services.EnvironmentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/environment")
public class EnvironmentController {
    @Autowired
    EnvironmentServices environmentServices;

    @PostMapping("/create")
    public ResponseDTO<Environment> createEnvironment(@RequestBody Environment env){
        return  environmentServices.createEnvironment(env);
    }

    @DeleteMapping("/delete/{envId}")
    public ResponseDTO<Environment> deleteEnvironment(@PathVariable int envId){
        return  environmentServices.deleteEnvironment(envId);
    }

    @GetMapping("/all")
    public ResponseDTO<List<Environment>> getAllEnvironment(){
        return environmentServices.getAllEnvironment();
    }

}
