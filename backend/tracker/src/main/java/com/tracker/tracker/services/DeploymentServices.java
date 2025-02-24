package com.tracker.tracker.services;

import com.tracker.tracker.Repository.DeploymentRepo;
import com.tracker.tracker.entity.DTO.BranchTimeDTO;
import com.tracker.tracker.entity.Deployment;
import com.tracker.tracker.entity.POJO.EnvironmentBranchesDTO;
import com.tracker.tracker.entity.DTO.ResponseDTO;
import com.tracker.tracker.entity.Projection.DeploymentProjection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DeploymentServices {
    @Autowired
    DeploymentRepo deploymentRepo;

    public void  saveAndUpdate(Deployment data){

        deploymentRepo.insertOrUpdateDeployment(data.getDeploymentId().getEnvId(),data.getDeploymentId().getId() ,  data.getTimestamp());
    }

    public ResponseDTO<List<EnvironmentBranchesDTO>> getGroupedDeployments() {
        List<DeploymentProjection> results = deploymentRepo.getAllDeploymentData();

        Map<Long, EnvironmentBranchesDTO> envMap = new HashMap<>();

        for (DeploymentProjection row : results) {
            Long envId = row.getEnvId();
            String envBranchName= row.getEnvBranchName();
            String deploymentEnvName = row.getDeploymentEnvName();
            Long branchId = row.getId();
            String branchName = row.getBranchName();
            String timeStamp = row.getDeploymentTime();
            BranchTimeDTO branchTimeDTO = new BranchTimeDTO(branchId, branchName, timeStamp);
            EnvironmentBranchesDTO envDTO = envMap.computeIfAbsent(envId, id -> new EnvironmentBranchesDTO(envId, envBranchName, deploymentEnvName, new ArrayList<>()));
            envDTO.getBranches().add(branchTimeDTO);
            envDTO.print();

        }

        List<EnvironmentBranchesDTO> result = new ArrayList<>(envMap.values());
        for (EnvironmentBranchesDTO envDTO : result) {

            envDTO.print();
            for (BranchTimeDTO branch : envDTO.getBranches()) {
                System.out.println("  Branch ID: " + branch.getId());
                System.out.println("  Branch Name: " + branch.getBranchName());
                System.out.println("  Deployment Time: " + branch.getTimeStamp());
            }
        }

        return new ResponseDTO<List<EnvironmentBranchesDTO>>(200 , result, "success") ;
    }


    public void deleteEnvironment(Long env_id){
        deploymentRepo.deleteByEnvId(env_id);
    }

}
