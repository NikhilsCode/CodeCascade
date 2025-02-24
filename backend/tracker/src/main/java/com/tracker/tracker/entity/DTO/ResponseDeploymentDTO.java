    package com.tracker.tracker.entity.DTO;

    import com.tracker.tracker.entity.Branch;

    import java.util.List;

    public class ResponseDeploymentDTO {

        public List<Branch> successfullyDeployed;
        public List<Branch> failedBranches;

        public ResponseDeploymentDTO(List<Branch> successfullyDeployed, List<Branch> failedBranches){
            this.successfullyDeployed = successfullyDeployed;
            this.failedBranches= failedBranches;
        }
    }
