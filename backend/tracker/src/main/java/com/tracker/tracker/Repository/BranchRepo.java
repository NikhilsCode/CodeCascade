package com.tracker.tracker.Repository;

import com.tracker.tracker.entity.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BranchRepo extends JpaRepository<Branch, Long> {
    Optional<Branch> findByBranchName(String branchName);
}
