package com.tracker.tracker.controller;

import com.tracker.tracker.entity.DTO.BranchDTO;
import com.tracker.tracker.entity.DTO.ResponseDTO;
import com.tracker.tracker.services.BranchServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/branch")
public class BranchController {
    @Autowired
    private BranchServices branchServices;


    @PostMapping("/create")
    public ResponseDTO<BranchDTO> createBranch(@RequestBody BranchDTO branchDTO) {
        return branchServices.createBranch(branchDTO);
    }


    @GetMapping("/allBranch")
    public ResponseDTO<List<BranchDTO>> getAllBranches() {
        return branchServices.getAllBranches();
    }

    @DeleteMapping("/{id}")
    public ResponseDTO<String> deleteBranch(@PathVariable Long id) {
        return branchServices.deleteBranch(id);
    }
}
