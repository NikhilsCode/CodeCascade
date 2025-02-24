package com.tracker.tracker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class DeploymentId implements Serializable {

    @Column(name = "envId")
    private Long envId;

    @Column(name = "id")
    private Long id;

    // Constructors, getters, setters, hashCode, and equals methods

    public DeploymentId( ) {}

    public DeploymentId(Long envId, Long id) {
        this.envId = envId;
        this.id = id;
    }

    public Long getEnvId() {
        return envId;
    }

    public void setEnvId(Long envId) {
        this.envId = envId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DeploymentId that = (DeploymentId) o;
        return envId.equals(that.envId) && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return 31 * envId.hashCode() + id.hashCode();
    }
}
