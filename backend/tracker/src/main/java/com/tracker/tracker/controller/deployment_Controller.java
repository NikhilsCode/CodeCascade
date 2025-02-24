//
//package com.tracker.tracker.controller;
//
//import com.tracker.tracker.entity.POJO.RequestDeployment;
//import com.tracker.tracker.utils.RunScript;
//import org.springframework.http.MediaType;
//import org.springframework.web.bind.annotation.*;
//import reactor.core.publisher.Flux;
//import reactor.core.publisher.Mono;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import java.time.Duration;
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//
//@RestController
//@CrossOrigin
//@RequestMapping("/deploy")
//public class deployment_Controller {
//
//    @PostMapping(value = "/deployBranch", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
//    public Flux<Map<String, Object>> deployBranch(@RequestBody RequestDeployment request) {
//        RunScript scriptRunner = new RunScript();
//
//        // Lists to track successful and failed deployments
//        List<String> successfulBranches = new ArrayList<>();
//        List<String> failedBranches = new ArrayList<>();
//
//        return Flux.fromIterable(request.listOfBranch)
//                .delayElements(Duration.ofSeconds(2)) // Simulate deployment time
//                .map(branch -> {
//                      String[] arg  = {request.deploymentBranch ,branch };
//                    int result = scriptRunner.runBashScript("F:/mergeBranch.sh", arg);
////                    int result = 0;
//                    Map<String, Object> response = new HashMap<>();
//                    response.put("statusCode", 102); // 102: Processing
//                    response.put("branch", branch);
//
//                    if (result == 0) { // Success
//                        successfulBranches.add(branch);
//                        response.put("status", "success");
//                        response.put("message", "Branch merged successfully");
//                    } else { // Failure
//                        failedBranches.add(branch);
//                        response.put("status", "failed");
//                        response.put("message", "Branch merged failed");
//                    }
//
//                    return response;
//                })
//                .concatWith(
//                        Mono.fromCallable(() -> {
//                            // Final summary with statusCode 200
//                            Map<String, Object> finalSummary = new HashMap<>();
//                            finalSummary.put("statusCode", 200); // 200: Success
//                            finalSummary.put("status", "completed");
//                            finalSummary.put("message", "Deployment process completed");
//                            finalSummary.put("successfullyDeployed", successfulBranches);
//                            finalSummary.put("failedBranches", failedBranches);
//                            return finalSummary;
//                        })
//                );
//    }
//}
//
