package com.tracker.tracker.Repository;

import com.tracker.tracker.entity.Environment;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface EnvironmentRepo extends JpaRepository<Environment, Integer> {
    Optional<Environment> findByDeploymentEnvName(String deploymentEnvName);
    boolean existsByDeploymentEnvName(String deploymentEnvName);

    @Transactional
    void deleteByEnvId(int envId); // Delete method
}
