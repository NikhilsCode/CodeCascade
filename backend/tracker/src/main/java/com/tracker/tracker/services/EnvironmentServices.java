package com.tracker.tracker.services;

import com.tracker.tracker.Repository.EnvironmentRepo;
import com.tracker.tracker.entity.Environment;
import com.tracker.tracker.entity.DTO.ResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EnvironmentServices {
    @Autowired
    EnvironmentRepo environmentRepo;

    public ResponseDTO<Environment> createEnvironment(Environment env){
        try{
            Environment savedEnv =  environmentRepo.save(env);
            return  new ResponseDTO<Environment>(200, savedEnv, "Environment Created Successfully");

        }catch (DataIntegrityViolationException e){
            return new ResponseDTO<>(500, null, "Database error: " + e.getMessage());
        }
    }

    public ResponseDTO<Environment> deleteEnvironment(int envId){
        try{
            environmentRepo.deleteByEnvId(envId);
            return  new ResponseDTO<>(200, null, "Environment deleted Successfully");

        }catch (DataIntegrityViolationException e){
            return new ResponseDTO<>(500, null, "Database error: " + e.getMessage());
        }
    }

    public ResponseDTO<List<Environment>> getAllEnvironment(){
        try{
            List<Environment> listOfEnvironment =  environmentRepo.findAll();
            return new ResponseDTO<List<Environment>>(200, listOfEnvironment, "Data found successfully");

        }catch (DataIntegrityViolationException e){
            return  new ResponseDTO<>(500, null ,  "Database error: " + e.getMessage());
        }
    }

}
