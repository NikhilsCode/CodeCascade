package com.tracker.tracker.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.sql.Timestamp;

@Entity
@Table(name = "deployment")
public class Deployment {

    @EmbeddedId
    private DeploymentId deploymentId;  // Composite primary key (envId, id)

    private String timestamp;  // Timestamp of the deployment

    public  Deployment(){};

    public Deployment( DeploymentId deploymentId, String timestamp ){
        this.deploymentId = deploymentId;
        this.timestamp = timestamp;
    }
    // Getters and Setters
    public DeploymentId getDeploymentId() {
        return deploymentId;
    }

    public void setDeploymentId(DeploymentId deploymentId) {
        this.deploymentId = deploymentId;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
