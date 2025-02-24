
package com.tracker.tracker.controller;

import com.tracker.tracker.entity.Branch;
import com.tracker.tracker.entity.Deployment;
import com.tracker.tracker.entity.DeploymentId;
import com.tracker.tracker.entity.POJO.EnvironmentBranchesDTO;
import com.tracker.tracker.entity.DTO.RequestDeploymentDTO;
import com.tracker.tracker.entity.DTO.ResponseDTO;
import com.tracker.tracker.entity.DTO.ResponseDeploymentDTO;
import com.tracker.tracker.services.DeploymentServices;
import com.tracker.tracker.utils.BuildScript;
import com.tracker.tracker.utils.DeleteScript;
import com.tracker.tracker.utils.DeploymentScript;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;



@RestController
@CrossOrigin
@RequestMapping("/deploy")
public class DeploymentController {
    @Autowired
    DeploymentServices deploymentServices;


    @PostMapping(value = "/deployBranch", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ResponseDTO<Object>> deployBranch(@RequestBody RequestDeploymentDTO request) {

        List<Branch> successfulBranches = new ArrayList<>();
        List<Branch> failedBranches = new ArrayList<>();
        DeploymentScript deploy = new DeploymentScript();
        DeleteScript deletebranch = new DeleteScript();

        // Handle Environment Deletion if required
        if (request.deploymentType == 1) {
            String[] arg = {request.deploymentEnvName};
            deletebranch.delete(arg);
            deploymentServices.deleteEnvironment(request.envId);
        }

        return Flux.fromIterable(request.listOfBranch)
                .delayElements(Duration.ofSeconds(2)) // Simulate deployment time
                .concatMap(branch -> {
                    String[] arg = {request.deploymentEnvName, branch.getBranchName()};
                    int result = deploy.deploy(arg);

                    if (result == 0) { // Success
                        successfulBranches.add(branch);
                        LocalDateTime currentTime = LocalDateTime.now();
                        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                        String formattedTime = currentTime.format(formatter);
                        DeploymentId deploymentId = new DeploymentId(request.envId, branch.getId());
                        Deployment deploymentObject = new Deployment(deploymentId, formattedTime);
                        deploymentServices.saveAndUpdate(deploymentObject);
                        return Mono.just(new ResponseDTO<Object>(102, branch.getBranchName() + " merged successfully", "success"));
                    } else { // Failure
                        failedBranches.add(branch);
                        return Mono.just(new ResponseDTO<Object>(103, branch.getBranchName() + " merge failed", "failed"));
                    }
                })
                .concatWith(Mono.fromRunnable(() -> {
                    if (!successfulBranches.isEmpty()) {
                        BuildScript buildscript = new BuildScript();
                        String[] arg = {request.deploymentEnvName};
                        buildscript.build(arg);
                    }
                }).then(Mono.just(new ResponseDTO<Object>(
                        200,
                        new ResponseDeploymentDTO(successfulBranches, failedBranches),
                        "Successfully deployed"
                ))));
    }


    @GetMapping("/list")
    public ResponseDTO<List<EnvironmentBranchesDTO>> getlist(){
        return deploymentServices.getGroupedDeployments();
    }

}

