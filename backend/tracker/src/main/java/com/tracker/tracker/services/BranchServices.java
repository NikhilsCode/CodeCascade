package com.tracker.tracker.services;

import com.tracker.tracker.Repository.BranchRepo;
import com.tracker.tracker.entity.Branch;
import com.tracker.tracker.entity.DTO.BranchDTO;
import com.tracker.tracker.entity.DTO.ResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BranchServices {
    @Autowired
    private BranchRepo branchRepo;

    public ResponseDTO<BranchDTO> createBranch(BranchDTO branchDTO) {
        // Check if branch name already exists
        if (branchRepo.findByBranchName(branchDTO.getBranchName()).isPresent()) {
            return new ResponseDTO<>(409, null, "Branch name already exists!");
        }

        try {
            // Convert DTO to Entity
            Branch branch = new Branch(branchDTO.getBranchName());
            Branch savedBranch = branchRepo.save(branch);

            // Convert back to DTO
            BranchDTO savedBranchDTO = new BranchDTO(savedBranch.getId(), savedBranch.getBranchName());
            return new ResponseDTO<>(200, savedBranchDTO, "Created Successfully");

        } catch (DataIntegrityViolationException e) {
            return new ResponseDTO<>(500, null, "Database error: " + e.getMessage());
        }
    }

    public ResponseDTO<List<BranchDTO>> getAllBranches() {
        try {
            List<BranchDTO> branchDTOList = branchRepo.findAll()
                    .stream()
                    .map(branch -> new BranchDTO(branch.getId(), branch.getBranchName())) // Convert Entity to DTO
                    .collect(Collectors.toList());

            return new ResponseDTO<>(200, branchDTOList, "Success");

        } catch (DataIntegrityViolationException e) {
            return new ResponseDTO<>(500, null, "Database error: " + e.getMessage());
        }
    }

    public ResponseDTO<String> deleteBranch(Long branchId) {
        try {
            Optional<Branch> branch = branchRepo.findById(branchId);
            if (branch.isEmpty()) {
                return new ResponseDTO<>(404, null, "Branch not found");
            }
            branchRepo.deleteById(branchId);
            return new ResponseDTO<>(200, "Branch deleted successfully", "Success");

        } catch (DataIntegrityViolationException e) {
            return new ResponseDTO<>(500, null, "Database error: " + e.getMessage());
        }
    }
}
