package com.tracker.tracker.entity.DTO;

import com.tracker.tracker.entity.Branch;

import java.util.ArrayList;

public class RequestDeploymentDTO {
    public ArrayList<Branch> listOfBranch;
    public String deploymentEnvName;
    public long envId;
    public int deploymentType;
//    public long id;

}
