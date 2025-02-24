package com.tracker.tracker.entity.DTO;


import com.tracker.tracker.entity.Branch;

import java.util.List;


public class EnvironmentBranchesDTO {
    private Long envId;
    private String envBranchName;
    private List<Branch> branches;
    private  String  deploymentEnvName;

    public EnvironmentBranchesDTO(Long envId, String envBranchName, String  deploymentEnvName, List<Branch> branches) {
        this.envId = envId;
        this.envBranchName = envBranchName;
        this.deploymentEnvName = deploymentEnvName;
        this.branches = branches;
    }

    // Getters and Setters
    public Long getEnvId() { return envId; }
    public void setEnvId(Long envId) { this.envId = envId; }

    public String getDeploymentEnvName() { return deploymentEnvName; }
    public void setDeploymentEnvName(String  deploymentEnvName) { this.deploymentEnvName = deploymentEnvName; }

    public String getEnvBranchName() { return envBranchName; }
    public void setEnvBranchName(String envBranchName) { this.envBranchName = envBranchName; }

    public List<Branch> getBranches() { return branches; }
    public void setBranches(List<Branch> branches) { this.branches = branches; }
}
