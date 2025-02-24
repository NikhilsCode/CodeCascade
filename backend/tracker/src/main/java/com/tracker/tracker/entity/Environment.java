package com.tracker.tracker.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Environment")
public class Environment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "envId")
    private int envId;

    @Column(name = "envBranchName", nullable = false, unique = true)
    private String envBranchName;

    @Column(name = "deploymentEnvName", nullable = false, unique = true) // Fixed typo
    private String deploymentEnvName;

    @Column(name = "lastUpdated")
    private String lastUpdated;


    public Environment() {}


    public Environment(String envBranchName, String deploymentEnvName, String lastUpdated) {
        this.envBranchName = envBranchName;
        this.deploymentEnvName = deploymentEnvName;
        this.lastUpdated = lastUpdated;
    }


    public int getEnvId() {
        return envId;
    }

    public String getEnvBranchName() {
        return envBranchName;
    }

    public String getDeploymentEnvName() {
        return deploymentEnvName;
    }

    public String getLastUpdated() {
        return lastUpdated;
    }


    public void setEnvBranchName(String envBranchName) {
        this.envBranchName = envBranchName;
    }

    public void setDeploymentEnvName(String deploymentEnvName) {
        this.deploymentEnvName = deploymentEnvName;
    }

    public void setLastUpdated(String lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}

//create table environments (envID INT AUTO_INCREMENT   PRIMARY key,
//                           envBranchName VARCHAR(150) UNIQUE,
//listOfBranch JSON,
//lastUpdated TIMESTAMP,
//deploymentEnvName VARCHAR(200));