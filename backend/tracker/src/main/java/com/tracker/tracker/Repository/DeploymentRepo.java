    package com.tracker.tracker.Repository;

    import com.tracker.tracker.entity.Deployment;
    import com.tracker.tracker.entity.DeploymentId;
    import com.tracker.tracker.entity.Projection.DeploymentProjection;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.data.jpa.repository.Modifying;
    import org.springframework.data.jpa.repository.Query;
    import org.springframework.transaction.annotation.Transactional;

    import java.util.List;

    public interface DeploymentRepo extends JpaRepository<Deployment, DeploymentId> {

        @Modifying
        @Transactional
        @Query(value = "INSERT INTO deployment (env_Id, id, timestamp) " +
                "VALUES (?1, ?2, ?3 ) " +
                "ON DUPLICATE KEY UPDATE timestamp = VALUES(timestamp)", nativeQuery = true)
        void insertOrUpdateDeployment(Long envId, Long id, String timestamp);


        @Transactional
        @Query(value = "SELECT e.env_id AS envId,e.env_id AS envId, e.env_branch_name AS envBranchName, e.deployment_env_name AS deploymentEnvName, " +
                "b.id AS id, b.branch_name AS branchName, " +
                "d.timestamp AS deploymentTime " +
                "FROM Environment e " +
                "JOIN Deployment d ON e.env_id = d.env_id " +
                "JOIN Branch b ON d.id = b.id " +
                "ORDER BY e.env_id",
                nativeQuery = true)
        List<DeploymentProjection> getAllDeploymentData();

        @Modifying
        @Transactional
        @Query(value = "DELETE FROM deployment WHERE env_id = ?1", nativeQuery = true)
        void deleteByEnvId(Long envId);

        @Modifying
        @Transactional
        @Query(value = "DELETE FROM deployment WHERE env_id = ?1 AND id = ?2", nativeQuery = true)
        void deleteByEnvIdAndId(Long envId, Long id);
    }
