package com.tracker.tracker.controller;

import com.tracker.tracker.entity.Branch;
import com.tracker.tracker.entity.RequestEditBranch;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;

@RestController
@RequestMapping("/branch")
public class BranchController {

    ArrayList<String> branchList = new ArrayList<>();
    ArrayList<Branch> branchDataBase = new ArrayList<>();

    //create branch
    @PostMapping("")
    public String createBranch(@RequestBody Branch branch){
        if(!branchList.contains(branch.branchName)){
            branchList.add(branch.branchName);
            branchDataBase.add(branch);
            return "Branch create";
        }else {
            return "Branch already exist";
        }

    }
    //edit branch name
    @PutMapping("/edit")
    public String editBranchName(@RequestBody RequestEditBranch request ){
        System.out.println(branchList.contains(request.oldBranchName));
        if(branchList.contains(request.oldBranchName)){
            branchList.remove(request.oldBranchName);
            for (int index = 0; index < branchDataBase.size(); index++) {
                Branch branch = branchDataBase.get(index);
                if (branch.getBranchName().equals(request.oldBranchName)) {
                    branchDataBase.remove(index);
                    break;
                }
            }
            branchList.add(request.newBranchName);
            branchDataBase.add(new Branch(request.newBranchName));

            return "Branch Name changed sucessfully";
        }else {
            return "Branch doesnot exist";
        }

    }

    //delete branch name
    @DeleteMapping("/delete/{branchName}")
    public String deleteBranch(@PathVariable String branchName){
        if(branchList.contains(branchName)){
            branchList.remove(branchName);
            for( int index = 0 ; index < branchDataBase.size(); index++){
                Branch branch = branchDataBase.get(index);
                if(branch.getBranchName().equals(branchName)){
                    branchDataBase.remove(index);
                    break;
                }
            }
            return "Branch delete successfully";
        }else {
            return "Branch doesnot exist";
        }
    }

    //ALl Branch list
    @GetMapping("/allBranch")
    public ArrayList<String>  allBranch(){
        return  branchList;
    }


    //list of enviornment branch is deployed on

    public String branchDeployedOn(){
        return "";
    }

}
