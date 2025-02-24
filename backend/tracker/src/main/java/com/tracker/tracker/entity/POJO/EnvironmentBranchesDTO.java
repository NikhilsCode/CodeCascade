package com.tracker.tracker.entity.POJO;

import com.tracker.tracker.entity.DTO.BranchTimeDTO;

import java.util.List;

public class EnvironmentBranchesDTO {
    private Long envId;
    private String envBranchName;
    private List<BranchTimeDTO> branches;
    private  String  deploymentEnvName;

    // Constructor
    public EnvironmentBranchesDTO(Long envId, String envBranchName,String  deploymentEnvName,  List<BranchTimeDTO> branches) {
        this.envId = envId;
        this.envBranchName = envBranchName;
        this.deploymentEnvName = deploymentEnvName;
        this.branches = branches;
    }

    // Getters and Setters
    public Long getEnvId() {
        return envId;
    }

    public void setEnvId(Long envId) {
        this.envId = envId;
    }

    public String getEnvBranchName() {
        return envBranchName;
    }

    public void setEnvBranchName(String envBranchName) {
        this.envBranchName = envBranchName;
    }

    public List<BranchTimeDTO> getBranches() {
        return branches;
    }

    public void setBranches(List<BranchTimeDTO> branches) {
        this.branches = branches;
    }

    public String getDeploymentEnvName() { return deploymentEnvName; }

    public void setDeploymentEnvName(String  deploymentEnvName) { this.deploymentEnvName = deploymentEnvName; }

    // Debugging Method
    public void print() {
        System.out.println(envId + " " + envBranchName + deploymentEnvName);
    }
}
