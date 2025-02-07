package com.tracker.tracker.entity;

import java.util.ArrayList;


public class Environment {
    int envId;
    String envBranchName;
    ArrayList<String> listOfBranch;
    String deploymentEnvName;
    String lastUpdated;

}


//create table environments (envID INT AUTO_INCREMENT   PRIMARY key,
//                           envBranchName VARCHAR(150) UNIQUE,
//listOfBranch JSON,
//lastUpdated TIMESTAMP,
//deploymentEnvName VARCHAR(200));