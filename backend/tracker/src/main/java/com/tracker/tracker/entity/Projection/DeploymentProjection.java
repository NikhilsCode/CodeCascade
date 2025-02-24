package com.tracker.tracker.entity.Projection;

public interface DeploymentProjection {
    Long getEnvId();
    String getEnvBranchName();
    String getDeploymentEnvName();
    Long getId();
    String getBranchName();
    String getDeploymentTime();
}
